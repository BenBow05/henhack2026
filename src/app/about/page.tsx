import Link from "next/link";
import { ArrowLeft, Sparkles, Users, Heart, Target, MessageCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary px-6 py-8 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl">About Gatherly</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="aspect-[21/9] bg-muted rounded-xl overflow-hidden mb-8">
            <img
              src="https://images.unsplash.com/photo-1758272133786-ee98adcc6837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjBmcmllbmRzJTIwbGF1Z2hpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NzIzNDY1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="People connecting at events"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl mb-4">Connecting People Through Shared Experiences</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Gatherly is more than just an event platform—it's a community builder that brings people together
            through shared interests and memorable experiences. We believe that the best moments in life are
            the ones we share with others, and we're here to make those connections happen.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-accent/30 rounded-xl p-8 mb-16 border border-accent">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-2xl">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To make it easier for people to discover events they love and find companions who share their
            passions. Whether you're exploring a new city, trying a new hobby, or pursuing a lifelong interest,
            Gatherly helps you find both the perfect event and the perfect people to attend with.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-2xl mb-8 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Discover Events</h3>
              <p className="text-muted-foreground">
                Browse a curated collection of events across multiple categories. From concerts to workshops,
                find experiences that match your interests.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl mb-3">Find Your People</h3>
              <p className="text-muted-foreground">
                Our smart matching system connects you with attendees who share your interests, making it
                easy to find event buddies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl mb-3">Build Community</h3>
              <p className="text-muted-foreground">
                Create meaningful connections with people who share your passions and build a network of
                friends for future adventures.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl mb-8">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl mb-2">Browse Events</h3>
                <p className="text-muted-foreground">
                  Explore events in your area or create your own. Filter by category to find exactly what
                  you're looking for.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl mb-2">Attend an Event</h3>
                <p className="text-muted-foreground">
                  Mark yourself as attending to unlock the matching feature and let others know you're going.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl mb-2">Find Your Match</h3>
                <p className="text-muted-foreground">
                  Discover other attendees with similar interests. Swipe through potential event buddies and
                  connect with those who share your passions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl mb-2">Make Connections</h3>
                <p className="text-muted-foreground">
                  Build friendships and expand your social circle. Attend events together and create
                  unforgettable memories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1769415243244-f88741695761?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb25uZWN0aW5nJTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc3MjM0NjUzOXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="People networking"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1771924368588-507c6a048363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzIzNDY1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Community gathering"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-card rounded-xl p-8 border border-border mb-16">
          <h2 className="text-2xl mb-6">Our Values</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl mb-2 text-primary">🤝 Connection</h3>
              <p className="text-muted-foreground">
                We believe in the power of human connection and creating opportunities for meaningful
                relationships to flourish.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 text-primary">🌟 Inclusivity</h3>
              <p className="text-muted-foreground">
                Everyone deserves to feel welcome. We're committed to creating a diverse and inclusive
                community for all.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 text-primary">🎯 Authenticity</h3>
              <p className="text-muted-foreground">
                We encourage people to be themselves and build genuine connections based on shared interests
                and values.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-2 text-primary">✨ Experience</h3>
              <p className="text-muted-foreground">
                Life is about experiences. We're here to help you discover new adventures and make the most
                of every moment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8" />
            <h2 className="text-2xl">Ready to Get Started?</h2>
          </div>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of people discovering events and making connections through Gatherly.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </main>
    </div>
  );
}
