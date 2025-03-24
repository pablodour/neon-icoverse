
import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <section id="videoBackground" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background with opacity overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          aria-hidden="true"
        >
          <source 
            src="/lovable-uploads/fontVideo2_copy.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 animate-fade-in neon-text">
          BAD HABITS
        </h1>
        
        <p className="text-lg md:text-xl text-light/80 text-center max-w-2xl mb-8 animate-slide-up">
          Explore our universe of artists and upcoming events in an immersive digital experience.
        </p>
        
        <button 
          className="px-8 py-3 border-2 border-neon text-neon hover:bg-neon hover:text-dark transition-all duration-300 rounded-md font-medium animate-pulse-neon"
          onClick={() => {
            document.getElementById('universe')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Discover
        </button>
      </div>
    </section>
  );
};

export default VideoBackground;
