import React, { useState } from 'react';
import { eventsData, findArtistById, Event, Artist } from '@/utils/dataIndex';
import {
  Calendar,
  MapPin,
  User,
  Ticket,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import ArtistProfile from './ArtistProfile';
import { Button } from './ui/button';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fullImageOpen, setFullImageOpen] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleArtistClick = (artistId: string) => {
    const artist = findArtistById(artistId);
    if (artist) {
      setSelectedArtist(artist);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Use event.images if available; otherwise fallback to event.imageUrl.
  const photos = event.images && event.images.length > 0 ? event.images : [event.imageUrl];

  return (
    <div className={`glassmorphism rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] group ${expanded ? 'col-span-full' : ''}`}>
      {/* Fixed-height container for proper cropping */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <img 
          src={photos[currentPhotoIndex]} 
          alt={`${event.title} - ${currentPhotoIndex + 1}`} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          onClick={() => setFullImageOpen(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop"; // Fallback image
          }}
        />
        {photos.length > 1 && (
          <>
            {/* Left Arrow on Card */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
              }}
              className="absolute left-4 inset-y-0 flex items-center z-20"
              aria-label="Previous Photo"
            >
              <div className="bg-black/70 p-2 rounded-full hover:bg-black/80 transition">
                <ChevronLeft size={24} className="text-white" />
              </div>
            </button>
            {/* Right Arrow on Card */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
              }}
              className="absolute right-4 inset-y-0 flex items-center z-20"
              aria-label="Next Photo"
            >
              <div className="bg-black/70 p-2 rounded-full hover:bg-black/80 transition">
                <ChevronRight size={24} className="text-white" />
              </div>
            </button>
            {/* Dot Indicators */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
              {photos.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${currentPhotoIndex === index ? 'bg-neon' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold group-hover:text-neon transition-colors">{event.title}</h3>
          <button 
            onClick={toggleExpand}
            className="text-light/70 hover:text-neon transition-colors p-1"
            aria-label={expanded ? "Collapse event details" : "Expand event details"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        <div className="flex items-center text-sm text-light/70 mb-2">
          <Calendar size={14} className="mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-light/70 mb-4">
          <MapPin size={14} className="mr-2" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-sm text-light/80 mb-4">{event.description}</p>
        
        <div className={`transition-all duration-300 ${expanded ? 'block' : 'hidden'}`}>
          <div className="border-t border-light/10 pt-4 mb-4">
            <h4 className="text-md text-light/90 mb-2">Additional Information</h4>
            <p className="text-sm text-light/70 mb-4">
              Doors open at 9:00 PM. The event is for ages 21 and over. Please bring valid ID.
            </p>
          </div>
        </div>
        
        <div className="border-t border-light/10 pt-4">
          <div className="flex items-center text-sm">
            <User size={14} className="mr-2 text-neon" />
            <span className="text-light/70">Artists:</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.artists.map(artistId => {
              const artist = findArtistById(artistId);
              return artist ? (
                <button 
                  key={artistId}
                  className="inline-block px-3 py-1 text-xs rounded-full border border-light/20 hover:border-neon hover:bg-neon/10 hover:text-neon transition-colors cursor-pointer relative group/artist"
                  onClick={() => handleArtistClick(artistId)}
                >
                  {artist.name}
                  <span className="absolute -inset-[2px] bg-neon/0 rounded-full group-hover/artist:bg-neon/10 group-hover/artist:shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-all duration-300"></span>
                </button>
              ) : null;
            })}
          </div>
        </div>
        
        {!event.isPast && (
          <div className="mt-4">
            <Button 
              className="w-full bg-neon text-black hover:bg-neon/80 font-semibold"
              onClick={() => window.open('https://tickets.badhabits.no', '_blank')}
            >
              <Ticket className="mr-1" size={16} />
              Buy Tickets
            </Button>
          </div>
        )}
      </div>

      {selectedArtist && (
        <ArtistProfile 
          artist={selectedArtist} 
          onClose={() => setSelectedArtist(null)} 
        />
      )}

      {/* Modal for Full Image View */}
      {fullImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-full max-h-full">
            <img 
              src={photos[currentPhotoIndex]} 
              alt={`${event.title} Full Image`} 
              className="max-w-full max-h-full object-contain"
            />
            {/* Close Button */}
            <button
              onClick={() => setFullImageOpen(false)}
              className="absolute top-4 right-4 bg-black/70 p-2 rounded-full hover:bg-black/80 transition"
              aria-label="Close Full Image"
            >
              <X size={24} className="text-white" />
            </button>
            {/* Navigation Arrows in Modal */}
            {photos.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-4 inset-y-0 flex items-center z-50"
                  aria-label="Previous Photo"
                >
                  <div className="bg-black/70 p-2 rounded-full hover:bg-black/80 transition">
                    <ChevronLeft size={24} className="text-white" />
                  </div>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
                  }}
                  className="absolute right-4 inset-y-0 flex items-center z-50"
                  aria-label="Next Photo"
                >
                  <div className="bg-black/70 p-2 rounded-full hover:bg-black/80 transition">
                    <ChevronRight size={24} className="text-white" />
                  </div>
                </button>
                {/* Dot Indicators in Modal */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-50">
                  {photos.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full ${currentPhotoIndex === index ? 'bg-neon' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingEvents = eventsData.filter(event => !event.isPast);
  const pastEvents = eventsData.filter(event => event.isPast);
  
  return (
    <section id="events" className="min-h-screen bg-dark py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Events</h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            Discover our upcoming and past events featuring talented artists from our universe.
          </p>
        </div>
        
        <div className="flex justify-center mb-10" role="tablist">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 mr-4 rounded-full transition-all duration-300 ${
              activeTab === 'upcoming' 
                ? 'bg-neon text-dark font-medium' 
                : 'border border-light/20 text-light hover:border-neon/50'
            }`}
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            aria-controls="upcoming-events"
            id="upcoming-tab"
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'past' 
                ? 'bg-neon text-dark font-medium' 
                : 'border border-light/20 text-light hover:border-neon/50'
            }`}
            role="tab"
            aria-selected={activeTab === 'past'}
            aria-controls="past-events"
            id="past-tab"
          >
            Past
          </button>
        </div>
        
        <div
          id="upcoming-events"
          role="tabpanel"
          aria-labelledby="upcoming-tab"
          className={`transition-opacity duration-300 ${activeTab === 'upcoming' ? 'block opacity-100' : 'hidden opacity-0'}`}
        >
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light/60">No upcoming events at the moment.</p>
              <p className="text-neon mt-2">Check back soon!</p>
            </div>
          )}
        </div>
        
        <div
          id="past-events"
          role="tabpanel"
          aria-labelledby="past-tab"
          className={`transition-opacity duration-300 ${activeTab === 'past' ? 'block opacity-100' : 'hidden opacity-0'}`}
        >
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light/60">No past events to display.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
