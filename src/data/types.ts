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
  attendees: string[]; // id of users
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
  events: string[] // ids for events being attended
}

export interface Match {
  user: User;
  score: number;
  commonInterests: string[];
  isAttending: boolean;
}
