
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
      id: "video-photographers",
      name: "Video & Photographers",
      description: "The heat, the sweat & our silouttes. Our videographers don't just document; they translate the energy of the night into pure visual rhythm. This is how we remember the unforgettable.",
      iconName: "camera",
      children: [
        {
          id: "videographers",
          name: "Videographers",
          artists: [
            {
              id: "video1",
              name: "Motion Masters",
              info: "Capturing the fluidity of movement and energy on the dance floor.",
              imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
              instagramUrl: "https://instagram.com/",
              category: "Visual",
              subCategory: "Videographer"
            },
            {
              id: "video2",
              name: "Night Visuals",
              info: "Specializing in low-light cinematography that preserves the mystery of the night.",
              imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
              instagramUrl: "https://instagram.com/",
              category: "Visual",
              subCategory: "Videographer"
            }
          ]
        },
        {
          id: "photographers",
          name: "Photographers",
          artists: [
            {
              id: "photo1",
              name: "Frame Catcher",
              info: "Finding the perfect moment in chaos - each image tells a story.",
              imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
              instagramUrl: "https://instagram.com/",
              category: "Visual",
              subCategory: "Photographer"
            },
            {
              id: "photo2",
              name: "Light Hunter",
              info: "Exploring the interplay between darkness and light in club environments.",
              imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
              instagramUrl: "https://instagram.com/",
              category: "Visual",
              subCategory: "Photographer"
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
      children: [
        {
          id: "tickets",
          name: "TICKETS",
          iconName: "ticket",
          description: "Information about tickets and purchasing.",
          faqItems: [
            {
              question: "Can I buy tickets at the door?",
              answer: "Usually not — most events sell out in advance. Get yours early online to secure your spot."
            },
            {
              question: "Are tickets refundable or transferable?",
              answer: "Tickets are non-refundable, but you're welcome to gift or sell it to a friend if you can't make it."
            },
            {
              question: "I didn't get a confirmation email — what do I do?",
              answer: "Check your spam folder first. If it's not there, contact us through Instagram @badhabits.oslo or email us."
            }
          ]
        },
        {
          id: "dresscode",
          name: "DRESSCODE",
          iconName: "shirt",
          description: "Guidelines about what to wear at our events.",
          faqItems: [
            {
              question: "Is there a dresscode?",
              answer: "Yes. Always. Every event has its own vibe, but you're expected to show up in something intentional, sensual, experimental, or fabulous. No basics. No effort = no entry."
            },
            {
              question: "Can I come in regular club wear?",
              answer: "If by \"regular\" you mean jeans and a tee — no. If you put effort into a bold look, even minimal, you'll probably be fine. Read the dresscode on each event page."
            }
          ]
        },
        {
          id: "pleasure-rooms",
          name: "PLEASURE ROOMS",
          iconName: "heart",
          description: "Information about our sensual exploration spaces.",
          faqItems: [
            {
              question: "What happens in the Pleasure Rooms?",
              answer: "They're sensual zones for connection, curiosity, and exploration. There are house rules to keep things safe, respectful, and consensual. You'll be briefed before entry."
            },
            {
              question: "Do I have to participate?",
              answer: "Absolutely not. No one is ever expected to do anything. You can just watch, vibe, or skip it entirely."
            }
          ]
        },
        {
          id: "accessibility",
          name: "ACCESSIBILITY",
          iconName: "accessibility",
          description: "Information about venue accessibility and accommodations.",
          faqItems: [
            {
              question: "Are your venues wheelchair accessible?",
              answer: "Most of our venues are, but not all. We always include accessibility info in the event post or ticket page. DM us if you're unsure — we got you."
            },
            {
              question: "I have specific access needs — can I reach out in advance?",
              answer: "Yes please! We want everyone to feel welcome. Send us a message on Instagram or email, and we'll do what we can to accommodate you."
            }
          ]
        },
        {
          id: "doors-entry",
          name: "DOORS & ENTRY",
          iconName: "door-open",
          description: "Information about event timing and venue policies.",
          faqItems: [
            {
              question: "What time do doors open?",
              answer: "Usually at 22:00 unless stated otherwise. Check the event post for specific timing."
            },
            {
              question: "Can I re-enter if I leave?",
              answer: "Only if you get stamped. Security is strict and re-entry is not always guaranteed. Ask before leaving."
            }
          ]
        },
        {
          id: "photography-consent",
          name: "PHOTOGRAPHY & CONSENT",
          iconName: "camera",
          description: "Guidelines for photography and respecting privacy.",
          faqItems: [
            {
              question: "Will there be a photographer?",
              answer: "Sometimes, yes. When there is, they're briefed to shoot consent-based, respectful, and artistic photos only. No one is ever the subject without their clear consent."
            },
            {
              question: "Can I take photos or videos inside?",
              answer: "Only outside the Pleasure Rooms, and always ask for consent if people are in your shot. No content farming or sneaky photos."
            }
          ]
        },
        {
          id: "bad-habits-universe",
          name: "THE BAD HABITS UNIVERSE",
          iconName: "globe",
          description: "About our concept and community.",
          faqItems: [
            {
              question: "What kind of party is BAD HABITS?",
              answer: "It's not just a party. It's a queer, sensorial universe. A celebration of boldness, eroticism, and community. We mix club culture, performance art, and immersive experiences."
            },
            {
              question: "Is it for everyone?",
              answer: "No. It's for the brave, the curious, the respectful, and the ones who dare to show up as more. If you're here for the vibe, the vision, and the community — welcome home."
            }
          ]
        },
        {
          id: "lost-found",
          name: "LOST & FOUND",
          iconName: "mail-search",
          description: "Information about lost items.",
          faqItems: [
            {
              question: "Lost something at one of our events?",
              answer: "All lost & found items are handled with care by the venue where the event took place. Please contact the venue directly, or reach out to us at contact@badhabits.no or via Instagram DM @badhabits.oslo if you need help getting in touch."
            }
          ]
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
