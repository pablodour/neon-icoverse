
import { Artist } from './types';

// Sample Artists (These will be referenced in the universe structure)
export const artists: Artist[] = [
  {
    id: "artist1",
    name: "BeatMaster",
    info: "Pioneering techno artist pushing the boundaries of sound.",
    imageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Electronic",
    subCategory: "Techno"
  },
  {
    id: "artist2",
    name: "Synthia",
    info: "Creating hypnotic techno rhythms since 2015.",
    imageUrl: "https://randomuser.me/api/portraits/women/40.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Electronic",
    subCategory: "Techno"
  },
  {
    id: "artist3",
    name: "Deep Dive",
    info: "Deep house producer known for soulful tracks.",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Electronic",
    subCategory: "House"
  },
  {
    id: "artist4",
    name: "TrapLord",
    info: "Emerging trap artist with heavy bass lines.",
    imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Hip-Hop",
    subCategory: "Trap"
  },
  {
    id: "artist5",
    name: "Soundscape",
    info: "Blending experimental sounds with hip-hop foundations.",
    imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Hip-Hop",
    subCategory: "Experimental"
  },
  {
    id: "artist6",
    name: "Echo Collective",
    info: "Indie band with electronic influences.",
    imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Alternative",
    subCategory: "Indie"
  },
  {
    id: "artist7",
    name: "Circuit Breakers",
    info: "Merging rock instruments with electronic production.",
    imageUrl: "https://randomuser.me/api/portraits/women/43.jpg",
    instagramUrl: "https://instagram.com/",
    category: "Alternative",
    subCategory: "Electronic Rock"
  }
];

export const findArtistById = (id: string): Artist | undefined => {
  return artists.find(artist => artist.id === id);
};
