export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  attendees: string[];
  maxAttendees: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  bio: string;
}

export interface Match {
  user: User;
  score: number;
  commonInterests: string[];
  isAttending: boolean;
}
