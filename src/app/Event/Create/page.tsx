"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEvents } from "../../../components/context/EventContext";
import { ArrowLeft, Calendar, MapPin, Users, Type, AlignLeft, Tag, Image } from "lucide-react";

export default function CreateEvent() {
  const navigate = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    category: "Music",
    maxAttendees: "100",
  });

  const categories = ["Music", "Technology", "Art", "Food", "Networking", "Sports", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      address: formData.address,
      category: formData.category,
      image: `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop`,
      attendees: [],
      maxAttendees: parseInt(formData.maxAttendees),
      organizer: "currentUserId"
    };
    const res = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    });
    const createdEvent = await res.json();
    navigate.push(`/Event/${createdEvent.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-6 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>
          <h1 className="text-3xl">Create New Event</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-card outline outline-2 outline-primary rounded-xl shadow-lg p-8 border border-border">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="flex items-center gap-2 mb-2">
                <Type className="w-5 h-5 text-primary" />
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Summer Music Festival 2026"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="flex items-center gap-2 mb-2">
                <AlignLeft className="w-5 h-5 text-primary" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell people what your event is about..."
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="time" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Central Park, New York"
              />
            </div>
            <div>
              <label htmlFor="location" className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Central Park, New York"
              />
            </div>

            {/* Category and Max Attendees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="maxAttendees" className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  Max Attendees
                </label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  required
                  min="1"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Create Event
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
