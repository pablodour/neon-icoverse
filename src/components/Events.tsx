
import React, { useState } from 'react';
import { eventsData, findArtistById, Event } from '@/utils/data';
import { Calendar, MapPin, User } from 'lucide-react';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="glassmorphism rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] group">
      <div className="aspect-[16/9] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop"; // Fallback image
          }}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 group-hover:text-neon transition-colors">{event.title}</h3>
        
        <div className="flex items-center text-sm text-light/70 mb-2">
          <Calendar size={14} className="mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-light/70 mb-4">
          <MapPin size={14} className="mr-2" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-sm text-light/80 mb-4">{event.description}</p>
        
        <div className="border-t border-light/10 pt-4">
          <div className="flex items-center text-sm">
            <User size={14} className="mr-2 text-neon" />
            <span className="text-light/70">Artists:</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.artists.map(artistId => {
              const artist = findArtistById(artistId);
              return artist ? (
                <span 
                  key={artistId}
                  className="inline-block px-3 py-1 text-xs rounded-full border border-light/20 hover:border-neon/50 transition-colors"
                >
                  {artist.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingEvents = eventsData.filter(event => !event.isPast);
  const pastEvents = eventsData.filter(event => event.isPast);
  
  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

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
