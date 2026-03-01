export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  image: string;
  attendees: number[]; // id of users
  maxAttendees: number;
  organizer: string
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  interests: string[];
  bio: string;
  gender: string;
  personality: string; 
  language: string
  events: number[] // ids for events being attended
  location: string
  matches: Record<number, number[]>; // eventId -> array of matched userIds

}

export interface Match {
  user: User;
  score: number;
  commonInterests: string[];
  isAttending: boolean;
}
