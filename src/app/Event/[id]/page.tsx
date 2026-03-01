"use client"
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Users, Heart, UserPlus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useUser } from "@/components/context/UserContext";

export default function EventDetails() {
  const params = useParams<{ id: string }>();
  const id: string = params.id;
  const navigate = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [matchesOpen, setMatchesOpen] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [modalUser, setModalUser] = useState<any | null>(null);
  const user = useUser();
  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
    .then(res => res.json())
    .then(data => setEvent(data));
  }, [id]);

  useEffect(() => {
    if(event && user.user){
      console.log("Event attendees:", event.attendees);
      console.log("Current user ID:", user.user.id);
      setAttending(event.attendees.includes(user.user.id));
    }}, [event]);
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Event not found</h2>
          <Link href="/" className="text-primary hover:underline">
            Go back to events
          </Link>
        </div>
      </div>
    );
  }

  const handleAttend = () => {
    let updatedAttendees = [];
    if (attending) {
      updatedAttendees = event.attendees.filter((id: number) => id !== user.user?.id);
      setEvent({
        ...event,
        //change this to filter out current user id
        attendees: event.attendees.filter((id: number) => id !== user.user?.id)
      });
      if(user.user?.events.length){
      fetch(`http://localhost:3001/users/${user.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: user.user.events.filter((id: number) => id !== event.id)
        })
        });
      }
    } else {
      updatedAttendees = [...event.attendees, user.user?.id];
      setEvent({
        ...event,
        //change this to add current user id
        attendees: [...event.attendees, user.user?.id]
      });
      if(user.user?.events.length){
      fetch(`http://localhost:3001/users/${user.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          events: [...user.user.events, event.id]
      })
    });
    }
    fetch(`http://localhost:3001/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attendees: updatedAttendees
      })
    });
    }
    
    setAttending(!event?.attendees.includes(user.user?.id));
  };

  const handleFindMatches = () => {
    if (!event || !event.attendees || event.attendees.length < 2) {
      alert("Not enough attendees to find matches yet.");
      return;
    }
    navigate.push(`/Match/${id}`);
  };

  const loadMatches = async () => {
    if (!user?.user || !event) return;
    setLoadingMatches(true);
    const otherIds = (event.attendees || []).filter((uid: any) => String(uid) !== String(user.user.id));
    if (otherIds.length === 0) {
      setMatches([]);
      setLoadingMatches(false);
      return;
    }

    const users = await Promise.all(
      otherIds.map((uid: any) => fetch(`http://localhost:3001/users/${uid}`).then(r => r.ok ? r.json() : null))
    );

    const me = user.user;
    const comps = users
      .filter((u): u is any => !!u)
      .map(u => {
        const common = me.interests.filter((i: any) => u.interests.includes(i));
        let score = 0;
        if (me.interests.length > 0) score += (common.length / Math.max(1, me.interests.length)) * 70;
        if (me.personality && me.personality === u.personality) score += 30;
        return { ...u, score: Math.round(score), commonInterests: common };
      })
      .filter(u => u.score > 0)
      .sort((a, b) => b.score - a.score);

    // Hardcoded mutual-approval mapping for demo purposes.
    // Only users listed as mutually approved for the current user will be shown.
    const mutualApprovals: Record<string, string[]> = {
      // user id "0" has mutually approved user "2"
      "0": ["2"],
      // add other pairs as needed for testing
    };

    const allowed = mutualApprovals[String(me.id)] || [];
    const filtered = allowed.length > 0 ? comps.filter(u => allowed.includes(String(u.id))) : comps;

    setMatches(filtered);
    setLoadingMatches(false);
  };

  const toggleMatches = () => {
    const opening = !matchesOpen;
    setMatchesOpen(opening);
    if (opening && matches.length === 0 && !loadingMatches) loadMatches();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>
        </div>
      </header>

      {/* Event Details */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-card outline outline-2 outline-primary rounded-xl shadow-lg overflow-hidden border border-border">
          {/* Event Image */}
          <div className="aspect-[21/9] bg-muted">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full mb-4">
              {event.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl mb-6">{event.title}</h1>

            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date & Time</div>
                  <div>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>{event.time}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Location</div>
                  <div>{event.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Attendees</div>
                  <div>
                    {event.attendees.length} / {event.maxAttendees} people
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAttend}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all ${
                  attending
                    ? "bg-accent text-accent-foreground border-2 border-primary"
                    : "bg-gradient-to-r from-primary to-secondary text-foreground hover:opacity-90"
                }`}
              >
                <Heart className={`w-5 h-5 ${attending ? "fill-current" : ""}`} />
                {attending ? "Attending" : "Attend Event"}
              </button>
              {attending && (
                <button
                  onClick={handleFindMatches}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-secondary to-primary text-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="w-5 h-5" />
                  Find People to Attend With
                </button>
              )}
            </div>

              {/* Matched users dropdown on event details (visible when attending) */}
              {attending && (
                <div className="mt-6 text-center">
                  <button
                    onClick={toggleMatches}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    Show matched users
                  </button>

                  {matchesOpen && (
                    <div className="mt-3 inline-block bg-card p-3 rounded-lg shadow-lg text-left">
                      {loadingMatches && <div className="text-sm text-muted-foreground">Loading matches…</div>}
                      {!loadingMatches && matches.length === 0 && (
                        <div className="text-sm text-muted-foreground">No matches found yet.</div>
                      )}
                      {!loadingMatches && matches.length > 0 && (
                        <ul className="space-y-2">
                          {matches.map(m => (
                            <li key={m.id}>
                              <button
                                onClick={() => setModalUser(m)}
                                className="w-full text-left px-2 py-2 hover:bg-muted rounded-lg flex items-center gap-3"
                              >
                                <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                  <div className="font-medium">{m.name}</div>
                                  <div className="text-xs text-muted-foreground">{m.score}% match</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

            {!attending && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Attend this event to find people with similar interests to go with!
              </p>
            )}
          </div>
        </div>
      </main>
      {/* Modal for matched user */}
      {modalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center gap-4 mb-4">
              <img src={modalUser.avatar} alt={modalUser.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="font-bold text-lg">{modalUser.name}</div>
                <div className="text-sm text-muted-foreground">{modalUser.email}</div>
                <div className="text-sm text-muted-foreground">Phone Number: {modalUser.phone}</div>
              </div>
            </div>
            <div className="mb-4 text-sm text-muted-foreground">{modalUser.bio}</div>
            <div className="flex justify-end">
              <button onClick={() => setModalUser(null)} className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
