export interface Artist {
  id: string;
  name: string;
  info: string;
  imageUrl: string;
  instagramUrl: string;
  category: string;
  subCategory?: string;
  isInfoNode?: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  artists: string[];
  isPast: boolean;
}

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  artists?: Artist[];
  description?: string;
}

// Sample data for the Universe visualization
export const universeData: TreeNode = {
  id: "root",
  name: "BAD HABITS",
  children: [
    {
      id: "electronic",
      name: "Electronic",
      children: [
        {
          id: "techno",
          name: "Techno",
          artists: [
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
            }
          ]
        },
        {
          id: "house",
          name: "House",
          artists: [
            {
              id: "artist3",
              name: "Deep Dive",
              info: "Deep house producer known for soulful tracks.",
              imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Electronic",
              subCategory: "House"
            }
          ]
        }
      ]
    },
    {
      id: "hiphop",
      name: "Hip-Hop",
      children: [
        {
          id: "trap",
          name: "Trap",
          artists: [
            {
              id: "artist4",
              name: "TrapLord",
              info: "Emerging trap artist with heavy bass lines.",
              imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Hip-Hop",
              subCategory: "Trap"
            }
          ]
        },
        {
          id: "experimental",
          name: "Experimental",
          artists: [
            {
              id: "artist5",
              name: "Soundscape",
              info: "Blending experimental sounds with hip-hop foundations.",
              imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Hip-Hop",
              subCategory: "Experimental"
            }
          ]
        }
      ]
    },
    {
      id: "alternative",
      name: "Alternative",
      children: [
        {
          id: "indie",
          name: "Indie",
          artists: [
            {
              id: "artist6",
              name: "Echo Collective",
              info: "Indie band with electronic influences.",
              imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Alternative",
              subCategory: "Indie"
            }
          ]
        },
        {
          id: "electronic-rock",
          name: "Electronic Rock",
          artists: [
            {
              id: "artist7",
              name: "Circuit Breakers",
              info: "Merging rock instruments with electronic production.",
              imageUrl: "https://randomuser.me/api/portraits/women/43.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Alternative",
              subCategory: "Electronic Rock"
            }
          ]
        }
      ]
    },
    {
      id: "vision",
      name: "Vision",
      description: "Our vision is to give local artists, performers, and creative beings a platform to express themselves. We want to contribute to a community where individuals feel safer expressing themselves and being themselves. We want to challenge Oslo's club scene with more elements of performance and visual art as decor to give an ever-changing atmosphere."
    },
    {
      id: "rules",
      name: "Rules",
      description: "BAD HABITS is a tolerant place where you can blossom as you are as long as you come with peace and respect for those around you can contact@badhabits.no for giving us feedback so that we can always give you the best experience when you're with us. BAD HABITS has zero tolerance for discrimination hate speech, or sexual harassment. If this occurs, you can contact the guards or the event organizer «Perosh.» Discrimination can result in forever being banned from our events and a possible police report. Your BAD HABITS are welcome, but discrimination is not one of these habits."
    },
    {
      id: "faq",
      name: "FAQ",
      description: "Frequently asked questions about BAD HABITS events, policies, and community."
    }
  ]
};

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

// Find artist by ID helper function
export const findArtistById = (id: string): Artist | undefined => {
  // Flatten the universe data to get all artists
  const allArtists: Artist[] = [];
  
  const extractArtists = (node: TreeNode) => {
    if (node.artists) {
      allArtists.push(...node.artists);
    }
    if (node.children) {
      node.children.forEach(extractArtists);
    }
  };
  
  extractArtists(universeData);
  
  return allArtists.find(artist => artist.id === id);
};
