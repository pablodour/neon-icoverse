
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Universe from '@/components/Universe';
import Events from '@/components/Events';

const Index = () => {
  const [activeSection, setActiveSection] = useState('universe');
  const universeRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  
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
        { id: 'universe', ref: universeRef },
        { id: 'events', ref: eventsRef }
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
      
      <div ref={universeRef} className="pt-16">
        <Universe />
      </div>
      
      <div ref={eventsRef}>
        <Events />
      </div>
      
      <footer className="py-8 px-6 bg-black border-t border-white/10">
        <div className="container mx-auto text-center text-light/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Bad Habits Web. All rights reserved.</p>
          <p className="mt-2">
            Designed with accessibility and minimalism in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
