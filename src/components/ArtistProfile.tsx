
import React from 'react';
import { Artist } from '@/utils/data';
import { Instagram } from 'lucide-react';

interface ArtistProfileProps {
  artist: Artist;
  onClose: () => void;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="artist-profile-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Modal content */}
      <div 
        className="relative glassmorphism rounded-lg p-6 max-w-md w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-light/70 hover:text-neon transition-colors"
          aria-label="Close artist profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-neon/50 animate-pulse-neon">
            <img 
              src={artist.imageUrl} 
              alt={artist.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://randomuser.me/api/portraits/lego/1.jpg"; // Fallback image
              }}
            />
          </div>
          
          <h2 
            id="artist-profile-title"
            className="text-2xl font-bold mb-2 neon-text"
          >
            {artist.name}
          </h2>
          
          <div className="flex items-center mb-4 text-sm text-light/60">
            <span className="mr-2">{artist.category}</span>
            {artist.subCategory && (
              <>
                <span className="mx-2">•</span>
                <span>{artist.subCategory}</span>
              </>
            )}
          </div>
          
          <p className="text-center mb-6 text-light/80">
            {artist.info}
          </p>
          
          <a 
            href={artist.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-neon/50 rounded-full hover:bg-neon/10 transition-all duration-300"
            aria-label={`Visit ${artist.name}'s Instagram profile`}
          >
            <Instagram size={18} className="text-neon" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
