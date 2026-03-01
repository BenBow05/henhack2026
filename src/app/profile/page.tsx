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
  Sparkles,
  Phone
} from "lucide-react";

import { AVAILABLE_INTERESTS, EVENT_CATEGORIES } from "../../data/constants";

type FormData = {
  name: string;
  bio: string;
  location: string;
  phoneNumber: string;
  interests: string[];
  gender: string;
  personality: string;
  language: string;
  avatar: string;
};

export default function ProfilePage() {
  return <Profile />;
}

export function Profile() {
  const { user, updateUser } = useUser();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    location: user?.location ?? "",
    phoneNumber: user?.phoneNumber ?? "",
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
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        // update context and localStorage so login state persists
        try {
          updateUser && updateUser(updated);
        } catch (e) {
          console.warn("Failed to update user in context", e);
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    }
  };

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
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-[90%] to-secondary px-4 py-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                Gatherly
              </h1>
            </div>

            {/* Spacer to balance layout */}
            <div className="w-16" />
          </div>

          <p className="text-lg text-white opacity-90">Edit your profile</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-6 font-semibold">Basic Information</h2>

            <div className="space-y-4">
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Location"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                value={formData.avatar}
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                placeholder="Avatar Image URL"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself"
                rows={4}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-6 font-semibold">Profile Details</h2>

            <div className="space-y-4">
              <input
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                placeholder="Gender"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                value={formData.personality}
                onChange={(e) =>
                  setFormData({ ...formData, personality: e.target.value })
                }
                placeholder="Personality (e.g. Introvert, ENFP, etc.)"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                placeholder="Language"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="bg-card rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl mb-4 font-semibold">Your Interests</h2>

            <div className="flex flex-wrap gap-3">
              {AVAILABLE_INTERESTS.map((interest) => {
                const isSelected = formData.interests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      isSelected
                        ? "bg-primary text-white border-primary"
                        : "bg-background hover:bg-muted"
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
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" /> Profile Saved!
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}