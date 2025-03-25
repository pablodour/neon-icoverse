
import { TreeNode } from './types';

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
      description: "Frequently asked questions about BAD HABITS events, policies, and community.",
      faqItems: [
        {
          question: "What is a community ticket?",
          answer: "Lorem ipsum lorem ipsum"
        },
        {
          question: "Is there a dress code?",
          answer: "Lorem ipsum lorem ipsum"
        }
      ]
    }
  ]
};

// Function to extract all artists from the universe data
export const getAllArtistsFromUniverse = (): any[] => {
  const allArtists: any[] = [];
  
  const extractArtists = (node: TreeNode) => {
    if (node.artists) {
      allArtists.push(...node.artists);
    }
    if (node.children) {
      node.children.forEach(extractArtists);
    }
  };
  
  extractArtists(universeData);
  
  return allArtists;
};

// Find artist by ID from the universe structure
export const findArtistByIdInUniverse = (id: string): any | undefined => {
  return getAllArtistsFromUniverse().find(artist => artist.id === id);
};
