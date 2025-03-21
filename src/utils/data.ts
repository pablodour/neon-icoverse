// utils/data.ts

// utils/data.ts

export interface AboutUsContent {
  title: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export const aboutUsContent: AboutUsContent = {
  title: "ABOUT US",
  sections: [
    {
      heading: "Our Concept",
      content: "BAD HABITS is an interdisciplinary club concept based on different art forms curated on the same dancefloor."
    },
    {
      heading: "Our Vision",
      content: "Our vision is to give local artists, performers, and creative beings a platform to express themselves. We want to contribute to a community where individuals feel safer expressing themselves and being themselves. We want to challenge Oslo’s club scene with more elements of performance and visual art as decor to give an ever-changing atmosphere."
    },
    {
      heading: "Our Rules",
      content: "BAD HABITS is a tolerant place where you can blossom as you are as long as you come with peace and respect for those around you. You can contact contact@badhabits.no for giving us feedback so that we can always give you the best experience when you’re with us. BAD HABITS has zero tolerance for discrimination, hate speech, or sexual harassment. If this occurs, you can contact the guards or the event organizer «Perosh.» Discrimination can result in forever being banned from our events and a possible police report. Your BAD HABITS are welcome, but discrimination is not one of these habits."
    }
  ]
};

// Rest of your existing code (Artist, Event, TreeNode, universeData, eventsData, findArtistById) remains unchanged.
export interface Artist {
  id: string;
  name: string;
  info: string;
  imageUrl: string;
  instagramUrl: string;
  category: string;
  subCategory?: string;
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
}

// Sample data for the Universe visualization
export const universeData: TreeNode = {
  id: "root",
  name: "Bad Habits",
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
    }
  ]
};

// Sample data for Events
export const eventsData: Event[] = [
  {
    id: "event1",
    title: "Techno Fusion Night",
    date: "2023-12-15",
    location: "Underground Club, Berlin",
    description: "A night of cutting-edge techno with our top artists.",
    imageUrl: "https://images.unsplash.com/photo-1574391879913-e7c6b5682e83?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHRlY2hubyUyMGNsdWJ8ZW58MHx8MHx8fDA%3D",
    artists: ["artist1", "artist2"],
    isPast: false
  },
  {
    id: "event2",
    title: "Hip-Hop Underground",
    date: "2023-12-22",
    location: "Beats Venue, New York",
    description: "Showcasing the best underground hip-hop talent.",
    imageUrl: "https://images.unsplash.com/photo-1601152888033-bf7fe239ab5c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGlwJTIwaG9wfGVufDB8fDB8fHww",
    artists: ["artist4", "artist5"],
    isPast: false
  },
  {
    id: "event3",
    title: "Indie Electronic Showcase",
    date: "2024-01-05",
    location: "Modern Gallery, London",
    description: "A fusion of indie and electronic music in an art gallery setting.",
    imageUrl: "https://images.unsplash.com/photo-1586156938613-ab7f1b8660ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D",
    artists: ["artist6", "artist7"],
    isPast: false
  },
  {
    id: "event4",
    title: "Deep House Sessions",
    date: "2023-11-18",
    location: "Beach Club, Ibiza",
    description: "Sunset sessions with deep house vibrations.",
    imageUrl: "https://images.unsplash.com/photo-1549924447-b07ad7fbaa97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYWNoJTIwY2x1YnxlbnwwfHwwfHx8MA%3D%3D",
    artists: ["artist3"],
    isPast: true
  },
  {
    id: "event5",
    title: "Experimental Sound Festival",
    date: "2023-10-25",
    location: "Arts Center, Tokyo",
    description: "A festival dedicated to experimental music across genres.",
    imageUrl: "https://images.unsplash.com/photo-1529354235303-cc42f23d767a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljJTIwZmVzdGl2YWx8ZW58MHx8MHx8fDA%3D",
    artists: ["artist5", "artist7"],
    isPast: true
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
