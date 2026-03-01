"use client"
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
// import { useEvents } from "../../../components/context/EventContext";
import { ArrowLeft, Calendar, MapPin, Users, Heart, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const params = useParams<{ id: string }>();
  const id: string = params.id;
  const navigate = useRouter();
  const [event, setEvent] = useState<any>();
  const [attending, setAttending] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
    .then(res => res.json())
    .then(data => setEvent(data));
    setAttending(event?.attendees.includes("currentUserId"));
  }, [id]);

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
    if (attending) {
      setEvent({
        ...event,
        //change this to filter out current user id
        attendees: event.attendees.filter((id: string) => id !== "currentUserId")
      });
    } else {      
      setEvent({
        ...event,
        //change this to add current user id
        attendees: [...event.attendees, "currentUserId"]
      });
    }
    fetch(`http://localhost:3001/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attendees: event.attendees
      })
    });
    //current-user will be replaced with ${user-id}
    fetch(`http://localhost:3001/users/current-user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          attendees: event.attendees
      })
    });
    setAttending(!event?.attendees.includes("currentUserId"));
  };

  const handleFindMatches = () => {
    navigate.push(`/`);
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

            {!attending && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Attend this event to find people with similar interests to go with!
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
