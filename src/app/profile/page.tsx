"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../components/context/UserContext";
import {
  ArrowLeft,
  User as UserIcon,
  MapPin,
  Heart,
  Tag,
  AlignLeft,
  Sparkles,
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

export function Profile() {
  const { user, updateUser, hasCompletedProfile } = useUser();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    interests: user?.interests || [],
    preferredCategories: user?.preferredCategories || [],
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      bio: user.bio || "",
      location: user.location || "",
      interests: user.interests || [],
      preferredCategories: user.preferredCategories || [],
    });
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredCategories: prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter((c) => c !== category)
        : [...prev.preferredCategories, category],
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <UserIcon className="w-8 h-8" />
            <h1 className="text-3xl">Your Profile</h1>
          </div>

          <p className="text-lg opacity-90">
            {hasCompletedProfile
              ? "Update your profile to get better event matches"
              : "Complete your profile to get personalized event recommendations"}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <h2 className="text-2xl mb-6">Basic Information</h2>

            <div className="space-y-6">
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
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Location"
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

          {/* Interests */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
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
                    {isSelected && <Check className="w-4 h-4 inline mr-1" />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <h2 className="text-2xl mb-4">Preferred Event Types</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EVENT_CATEGORIES.map((category) => {
                const isSelected =
                  formData.preferredCategories.includes(category);

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`p-4 rounded-xl border ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-background"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg"
          >
            {saved ? "Profile Saved!" : "Save Profile"}
          </button>
        </form>
      </main>
    </div>
  );
}