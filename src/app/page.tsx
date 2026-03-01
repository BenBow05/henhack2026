"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Sparkles, Menu } from "lucide-react";
import { useUser } from "../components/context/UserContext";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/events`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-[90%] to-secondary px-4 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                Gatherly
              </h1>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3">
              {/* About Button - Shown only on medium screens and up, to the left of hamburger */}
              <Link 
                href="/about" 
                className="hidden md:block px-4 py-2 mr-4 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
              >
                About
              </Link>

              {/* Hamburger Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-8 h-8 text-white" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100">
                    
                    {/* Mobile-only About Link (visible when hidden in header) */}
                    <Link
                      href="/about"
                      className="block md:hidden px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-50 text-gray-700"
                    >
                      About
                    </Link>

                    {/* If NOT logged in */}
                    {!user && (
                      <Link
                        href="/login"
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        Login
                      </Link>
                    )}

                    {/* If logged in */}
                    {user && (
                      <>
                        <Link
                          href="/Event/Create"
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          Create New Event
                        </Link>

                        <Link
                          href="/Event/Personal"
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          View My Events
                        </Link>

                        <Link
                          href="/profile"
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
                        >
                          Edit Profile
                        </Link>

                        <button
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-red-600 font-medium"
                        >
                          Sign Out
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-lg text-white opacity-90">
            Discover events, meet amazing people
          </p>
        </div>
      </header>

      {/* Events Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground text-gray-600">Find your next adventure and connect with like-minded people</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/Event/${event.id}`}
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
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
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