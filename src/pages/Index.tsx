
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Universe from '@/components/Universe';
import Events from '@/components/Events';
import VideoBackground from '@/components/VideoBackground';
import Contact from '@/components/Contact';

const Index = () => {
  const [activeSection, setActiveSection] = useState('videoBackground');
  const videoBackgroundRef = useRef<HTMLDivElement>(null);
  const universeRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Handle navigation
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const sections = [
        { id: 'videoBackground', ref: videoBackgroundRef },
        { id: 'universe', ref: universeRef },
        { id: 'events', ref: eventsRef },
        { id: 'contact', ref: contactRef }
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-dark text-light overflow-hidden">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      
      <div ref={videoBackgroundRef} id="videoBackground">
        <VideoBackground />
      </div>

      <div ref={universeRef} id="universe" className="pt-16">
        <Universe />
      </div>
      
      <div ref={eventsRef} id="events">
        <Events />
      </div>
      
      <div ref={contactRef} id="contact">
        <Contact />
      </div>
      
      <footer className="py-8 px-6 bg-black border-t border-white/10">
        <div className="container mx-auto text-center text-light/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Bad Habits. All rights reserved.</p>
          <p className="mt-2">
            Designed with accessibility and minimalism in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
