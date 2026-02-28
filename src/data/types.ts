export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  image: string;
  attendees: string[];
  maxAttendees: number;
  organizer: string
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  interests: string[];
  bio: string;
  gender: string;
  personality: string; 
  language: string
}

export interface Match {
  user: User;
  score: number;
  commonInterests: string[];
  isAttending: boolean;
}

export interface UPref{
  gender: string //gender a user wants to get matched with 
  ageMin: number //minimum age for user prefs
  ageMax: number //age max a user prefers
  language: string //spoken language
  personality: string //introvert / extrovert etc.
}