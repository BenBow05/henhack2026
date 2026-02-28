"use client"
import { useEvents } from "../components/context/EventContext";
import Link from "next/link";
import { Calendar, MapPin, Users, Plus, Sparkles } from "lucide-react";

export default function Home() {
  const { events } = useEvents();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#299963] px-4 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent from-[80%] to-secondary to-[75%] bg-clip-text text-transparent ...">Gatherly</h1>
            </div>
            <Link
              href="/create"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          </div>
          <p className="text-lg opacity-90">Discover events, meet amazing people</p>
        </div>
      </header>

      {/* Events Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">Find your next adventure and connect with like-minded people</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.id}`}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="aspect-video bg-muted overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm mb-3">
                  {event.category}
                </div>
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
