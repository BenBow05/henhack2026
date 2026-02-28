"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEvents } from "../../../components/context/EventContext";
import { Calendar, MapPin, Users, UserPlus, Sparkles, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { events, isAttending, getMatches, approvedMatches } = useEvents();

  const myEvents = events.filter((event) => isAttending(event.id));

  const getMatchCount = (eventId: string) => {
    const matches = getMatches(eventId);
    const approved = approvedMatches[eventId] || [];
    return { available: matches.length, approved: approved.length };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl">Gatherly</h1>
            </div>

            <Link
              href="/"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              Browse Events
            </Link>
          </div>

          <p className="text-lg opacity-90">
            Your upcoming events and connections
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Events You're Attending</h2>
          <p className="text-muted-foreground">
            {myEvents.length === 0
              ? "You haven't joined any events yet."
              : `You're attending ${myEvents.length} ${
                  myEvents.length === 1 ? "event" : "events"
                }`}
          </p>
        </div>

        {myEvents.length === 0 ? (
          <div className="bg-card rounded-xl shadow-lg p-12 text-center border border-border">
            <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl mb-4">No Events Yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start attending events to connect with people!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Explore Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myEvents.map((event) => {
              const { available, approved } = getMatchCount(event.id);

              return (
                <div
                  key={event.id}
                  className="bg-card rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                    {/* Image */}
                    <div className="aspect-video lg:aspect-square bg-muted overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm mb-3">
                          {event.category}
                        </div>

                        <h3 className="text-2xl mb-2">{event.title}</h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-secondary" />
                            <span>
                              {new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              at {event.time}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span>{event.location}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-secondary" />
                            <span>
                              {event.attendees.length} / {event.maxAttendees} attending
                            </span>
                          </div>

                          {approved > 0 && (
                            <div className="flex items-center gap-2">
                              <UserPlus className="w-4 h-4 text-primary" />
                              <span className="font-medium text-primary">
                                {approved} connection{approved !== 1 ? "s" : ""} made
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Link
                          href={`/Event/${event.id}`}
                          className="flex-1 px-4 py-3 bg-muted hover:bg-muted/80 text-center rounded-lg transition-colors"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() =>
                            router.push(`/Event/${event.id}/matches`)
                          }
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <UserPlus className="w-5 h-5" />
                          Find Matches
                          {available > 0 && (
                            <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                              {available}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}