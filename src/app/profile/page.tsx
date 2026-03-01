"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "../../components/context/UserContext";
import {
  ArrowLeft,
  User as UserIcon,
  MapPin,
  Heart,
  Tag,
  AlignLeft,
  Check,
} from "lucide-react";

import { AVAILABLE_INTERESTS, EVENT_CATEGORIES } from "../../data/constants";

type FormData = {
  name: string;
  bio: string;
  location: string;
  interests: string[];
  preferredCategories: string[];
};


export default function ProfilePage() {
  return <Profile />;
}

export function Profile() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    location: user?.location ?? "",
    interests: user?.interests ?? [],
    gender: user?.gender ?? "",
    personality: user?.personality ?? "",
    language: user?.language ?? "",
    avatar: user?.avatar ?? "",
  });

  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }};

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-6">Basic Information</h2>

            <div className="space-y-4">

              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Location"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                placeholder="Avatar Image URL"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-6">Profile Details</h2>

            <div className="space-y-4">

              <input
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                placeholder="Gender"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                value={formData.personality}
                onChange={(e) =>
                  setFormData({ ...formData, personality: e.target.value })
                }
                placeholder="Personality (e.g. Introvert, ENFP, etc.)"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                placeholder="Language"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-4">Your Interests</h2>

            <div className="flex flex-wrap gap-3">
              {AVAILABLE_INTERESTS.map((interest) => {
                const isSelected = formData.interests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg border ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-background"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white"
          >
            {saved ? "Profile Saved!" : "Save Profile"}
          </button>
        </form>
      </main>
    </div>
  );
}