"use client"
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, X, Sparkles, Users, CheckCircle } from "lucide-react";
import { Match } from "../../../data/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FindMatches() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>();
  useEffect(() => {
    fetch(`http://localhost:3001/events/${id}`)
    .then(res => res.json())
    .then(data => setEvent(data));
  }, [id]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateCompatibility = (current: any, other: any) => {
  let score = 0;

  // Interest weight 70%
  const common =
    current.interests.filter((i: string) =>
      other.interests.includes(i)
    );

  score +=
    (common.length /
      current.interests.length) *
    70;

  // Personality weight 30%
  if (
    current.personality ===
    other.personality
  ) {
    score += 30;
  }

  return {
    score: Math.round(score),
    commonInterests: common
  };
}
  useEffect(() => {
    if (id) {
      const matchData = getMatches(id);
      setMatches(matchData);
    }
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Event not found</h2>
          <Link href="/" className="text-primary hover:underline">
            Go back to events
          </Link>
        </div>
      </div>
    );
  }

  const handleApprove = () => {
    if (currentIndex < matches.length) {
      approveMatch(id!, matches[currentIndex].user.id);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleDeny = () => {
    if (currentIndex < matches.length) {
      denyMatch(id!, matches[currentIndex].user.id);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const currentMatch = matches[currentIndex];
  const hasMatches = matches.length > 0;
  const isComplete = currentIndex >= matches.length;
  const approved = approvedMatches[id!] || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-2 py-2 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/Event/${id}`}
            className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Event
          </Link>
          <h1 className="text-3xl mb-2">Find Your Event Buddies</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-4">
        {/* Progress */}
        {hasMatches && !isComplete && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {matches.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {approved.length} approved
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / matches.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Match Card */}
        {!isComplete && hasMatches && currentMatch && (
          <div className="bg-card outline outline-2 outline-primary rounded-2xl shadow-2xl overflow-hidden border border-border max-w-2xl mx-auto">
            <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
              <img
                src={currentMatch.user.avatar}
                alt={currentMatch.user.name}
                className="w-48 h-48 rounded-full object-cover border-8 border-white shadow-xl outline outline-2 outline-primary"
              />
            </div>
            
            <div className="p-4">
              {/* Match Score */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-lg">
                  {currentMatch.score}% Match
                </span>
              </div>

              {/* User Info */}
              <h2 className="text-3xl text-center mb-2">{currentMatch.user.name}</h2>
              <p className="text-center text-muted-foreground mb-6">{currentMatch.user.bio}</p>

              {/* Common Interests */}
              {currentMatch.commonInterests.length > 0 && (
                <div className="mb-6 p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-secondary" />
                    <h3 className="font-medium">Common Interests</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.commonInterests.map((interest) => (
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
                  {currentMatch.user.interests.map((interest) => (
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

              {/* Action Buttons */}
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

        {/* No Matches or Complete */}
        {(isComplete || !hasMatches) && (
          <div className="bg-card rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-border">
            {approved.length > 0 ? (
              <>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl mb-4">Great Connections Made!</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  You've approved {approved.length} {approved.length === 1 ? "person" : "people"} to attend with.
                  They'll be notified of your interest!
                </p>
              </>
            ) : (
              <>
                <Users className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="text-3xl mb-4">No More Matches</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {hasMatches
                    ? "You've seen all potential matches for this event."
                    : "No potential matches found for this event yet. Check back later!"}
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
