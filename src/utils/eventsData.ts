
import { Event } from './types';

// Sample Events Data
export const eventsData: Event[] = [
  {
    id: "event1",
    title: "Techno Night",
    date: "2023-12-15",
    location: "Club Arena, Oslo",
    description: "A night of pulsating techno beats featuring top artists from our universe.",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
    artists: ["artist1", "artist2"],
    isPast: true
  },
  {
    id: "event2",
    title: "House Sessions",
    date: "2023-11-05",
    location: "Warehouse, Oslo",
    description: "Deep house vibes all night long with our resident DJs.",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop",
    artists: ["artist3"],
    isPast: true
  },
  {
    id: "event3",
    title: "Hip-Hop Showcase",
    date: "2024-07-20",
    location: "Urban Hall, Oslo",
    description: "Experience the best of experimental hip-hop with our talented artists.",
    imageUrl: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800&auto=format&fit=crop",
    artists: ["artist4", "artist5"],
    isPast: false
  },
  {
    id: "event4",
    title: "Alternative Fusion",
    date: "2024-08-10",
    location: "Art Space, Oslo",
    description: "A unique blend of indie and electronic rock sounds that push boundaries.",
    imageUrl: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&auto=format&fit=crop",
    artists: ["artist6", "artist7"],
    isPast: false
  },
  {
    id: "event5",
    title: "Electronic Showcase",
    date: "2024-09-15",
    location: "Club Arena, Oslo",
    description: "Showcasing the diverse electronic music talent from our universe.",
    imageUrl: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop",
    artists: ["artist1", "artist3"],
    isPast: false
  }
];
