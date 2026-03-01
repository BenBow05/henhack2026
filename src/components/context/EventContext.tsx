// "use client"
// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { Event, User, Match } from "../../data/types";
// import { mockEvents, mockUsers, currentUser } from "../../data/mockdata";

// interface EventContextType {
//   events: Event[];
//   addEvent: (event: Event) => void;
//   getEvent: (id: string) => Event | undefined;
//   attendEvent: (eventId: string) => void;
//   isAttending: (eventId: string) => boolean;
//   getMatches: (eventId: string) => Match[];
//   approveMatch: (eventId: string, userId: string) => void;
//   denyMatch: (eventId: string, userId: string) => void;
//   approvedMatches: Record<string, string[]>;
// }

// const EventContext = createContext<EventContextType | undefined>(undefined);

// export function EventProvider({ children }: { children: ReactNode }) {
//   const [events, setEvents] = useState<Event[]>(mockEvents);
//   const [attendingEvents, setAttendingEvents] = useState<Set<string>>(new Set(["1", "2"]));
//   const [approvedMatches, setApprovedMatches] = useState<Record<string, string[]>>({});
//   const [deniedMatches, setDeniedMatches] = useState<Record<string, string[]>>({});

//   const addEvent = (event: Event) => {
//     setEvents((prev) => [event, ...prev]);
//   };

//   const getEvent = (id: string) => {
//     return events.find((event) => event.id === id);
//   };

//   const attendEvent = (eventId: string) => {
//     setAttendingEvents((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(eventId)) {
//         newSet.delete(eventId);
//       } else {
//         newSet.add(eventId);
//       }
//       return newSet;
//     });
//   };

//   const isAttending = (eventId: string) => {
//     return attendingEvents.has(eventId);
//   };

//   const getMatches = (eventId: string): Match[] => {
//     const event = getEvent(eventId);
//     if (!event) return [];

//     // Get users attending the event
//     const attendingUsers = mockUsers.filter((user) => event.attendees.includes(user.id));

//     // Filter out already approved or denied users
//     const approved = approvedMatches[eventId] || [];
//     const denied = deniedMatches[eventId] || [];
//     const alreadyProcessed = new Set([...approved, ...denied]);

//     const matches: Match[] = attendingUsers
//       .filter((user) => !alreadyProcessed.has(user.id))
//       .map((user) => {
//         // Calculate match score based on common interests
//         const commonInterests = user.interests.filter((interest) =>
//           currentUser.interests.includes(interest)
//         );
//         const score = Math.round((commonInterests.length / currentUser.interests.length) * 100);

//         return {
//           user,
//           score,
//           commonInterests,
//           isAttending: true,
//         };
//       })
//       .sort((a, b) => b.score - a.score);

//     return matches;
//   };

//   const approveMatch = (eventId: string, userId: string) => {
//     setApprovedMatches((prev) => ({
//       ...prev,
//       [eventId]: [...(prev[eventId] || []), userId],
//     }));
//   };

//   const denyMatch = (eventId: string, userId: string) => {
//     setDeniedMatches((prev) => ({
//       ...prev,
//       [eventId]: [...(prev[eventId] || []), userId],
//     }));
//   };

//   return (
//     <EventContext.Provider
//       value={{
//         events,
//         addEvent,
//         getEvent,
//         attendEvent,
//         isAttending,
//         getMatches,
//         approveMatch,
//         denyMatch,
//         approvedMatches,
//       }}
//     >
//       {children}
//     </EventContext.Provider>
//   );
// }

// export function useEvents() {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error("useEvents must be used within an EventProvider");
//   }
//   return context;
// }
