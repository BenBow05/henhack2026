"use client"
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, X, Sparkles, Users, CheckCircle } from "lucide-react";
import { Match, User, Event } from "../../../data/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@/components/context/UserContext";

function calculateCompatibility(me: User, other: User): { score: number; commonInterests: string[] } {
  const commonInterests = me.interests.filter(i => other.interests.includes(i));
  let score = 0;

  // Interests: 70% weight
  if (me.interests.length > 0) {
    score += (commonInterests.length / me.interests.length) * 70;
  }

  // Personality: 30% weight
  if (me.personality === other.personality) {
    score += 30;
  }

  return { score: Math.round(score), commonInterests };
}

async function getMatches(eventId: string, me: User): Promise<Match[]> {
  // Fetch the event to get its attendee IDs
  const eventRes = await fetch(`http://localhost:3001/events/${eventId}`);
  if (!eventRes.ok) return [];
  const event: Event = await eventRes.json();

  // FIX: Coerce both sides to strings before comparing to handle mixed number/string IDs in db.json
  const otherIds = event.attendees.filter(uid => String(uid) !== String(me.id));
  if (otherIds.length === 0) return [];

  // Fetch each attendee's user data
  const userFetches = otherIds.map(uid =>
    fetch(`http://localhost:3001/users/${String(uid)}`).then(r => r.ok ? r.json() : null)
  );
  const users: (User | null)[] = await Promise.all(userFetches);

  // Build Match objects with compatibility scores, sorted best first
  return users
    .filter((u): u is User => u !== null)
    .map(u => {
      const { score, commonInterests } = calculateCompatibility(me, u);
      return { user: u, score, commonInterests, isAttending: true };
    })
    .sort((a, b) => b.score - a.score);
}

export default function FindMatches() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [event, setEvent] = useState<Event | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  // FIX: Use string[] so IDs match fetched user.id values (which are strings from db.json)
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [deniedIds, setDeniedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    // Fetch event info
    fetch(`http://localhost:3001/events/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setEvent(data));

    // FIX: Guest fallback uses a string ID to stay consistent with db.json string IDs
    const me: User = user ?? {
      id: 0,
      name: "Guest",
      email: "",
      password: "",
      avatar: "",
      interests: [],
      bio: "",
      gender: "",
      personality: "",
      language: "",
      events: [],
      location: "",
      phone: "",
      matches: {}
    };

    getMatches(id, me).then(result => {
      setMatches(result);
      setLoading(false);
    });
  }, [id, user]);

  const handleApprove = () => {
    if (currentIndex >= matches.length) return;
    const matched = matches[currentIndex];
    // FIX: Coerce to string before storing so approvedIds.includes() works correctly
    setApprovedIds(prev => [...prev, String(matched.user.id)]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleDeny = () => {
    if (currentIndex >= matches.length) return;
    const matched = matches[currentIndex];
    // FIX: Coerce to string before storing
    setDeniedIds(prev => [...prev, String(matched.user.id)]);
    setCurrentIndex(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Finding matches...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Event not found</h2>
          <Link href="/" className="text-primary hover:underline">Go back to events</Link>
        </div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];
  const hasMatches = matches.length > 0;
  const isComplete = currentIndex >= matches.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/Event/${id}`}
            className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Event
          </Link>
          <h1 className="text-3xl mb-1">Find Your Event Buddies</h1>
          <p className="opacity-80 text-sm">{event.title}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Progress bar */}
        {hasMatches && !isComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {matches.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {approvedIds.length} approved
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${((currentIndex) / matches.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Match Card */}
        {!isComplete && hasMatches && currentMatch && (
          <div className="bg-card outline outline-2 outline-primary rounded-2xl shadow-2xl overflow-hidden border border-border max-w-2xl mx-auto">
            <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <img
                src={currentMatch.user.avatar}
                alt={currentMatch.user.name}
                className="w-48 h-48 rounded-full object-cover border-8 border-white shadow-xl outline outline-2 outline-primary"
              />
            </div>

            <div className="p-6">
              {/* Score */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-lg">{currentMatch.score}% Match</span>
              </div>

              {/* Name + bio */}
              <h2 className="text-3xl text-center mb-2">{currentMatch.user.name}</h2>
              <p className="text-center text-muted-foreground mb-2">{currentMatch.user.bio}</p>
              <p className="text-center text-sm text-muted-foreground mb-6">
                {currentMatch.user.location} · {currentMatch.user.personality}
              </p>

              {/* Common Interests */}
              {currentMatch.commonInterests.length > 0 && (
                <div className="mb-4 p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-secondary" />
                    <h3 className="font-medium">Common Interests</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.commonInterests.map(interest => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* All Interests */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">All Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.user.interests.map(interest => (
                    <span
                      key={interest}
                      className={`px-3 py-1 rounded-full text-sm ${
                        currentMatch.commonInterests.includes(interest)
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleDeny}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                  Pass
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-foreground rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Heart className="w-6 h-6" />
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Done / No matches */}
        {(isComplete || !hasMatches) && (
          <div className="bg-card rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-border">
            {approvedIds.length > 0 ? (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl mb-4">Great Connections Made!</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  You connected with {approvedIds.length} {approvedIds.length === 1 ? "person" : "people"}.
                </p>
                {/* Show approved matches summary */}
                {/* FIX: Coerce m.user.id to string when checking against approvedIds (string[]) */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {matches
                    .filter(m => approvedIds.includes(String(m.user.id)))
                    .map(m => (
                      <div key={m.user.id} className="flex flex-col items-center gap-1">
                        <img
                          src={m.user.avatar}
                          alt={m.user.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                        />
                        <span className="text-sm">{m.user.name}</span>
                        <span className="text-xs text-muted-foreground">{m.score}%</span>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <>
                <Users className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="text-3xl mb-4">No More Matches</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {hasMatches
                    ? "You've seen all potential matches for this event."
                    : "No other attendees found for this event yet. Check back later!"}
                </p>
              </>
            )}
            <Link
              href={`/Event/${id}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Event Details
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}