
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface NavItemProps {
  title: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, href, active, onClick }) => {
  return (
    <li className="relative">
      <a 
        href={href} 
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={cn(
          "py-2 px-4 text-sm transition-all duration-300 inline-block text-glow-hover",
          active ? "text-neon" : "text-light hover:text-neon/80"
        )}
        aria-current={active ? "page" : undefined}
      >
        {title}
        {active && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon animate-pulse-neon" />
        )}
      </a>
    </li>
  );
};

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glassmorphism shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img 
              src="/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png" 
              alt="Bad Habits Logo" 
              className="h-8 w-auto mr-3" 
            />
          </a>
        </div>
        
        <nav aria-label="Main navigation">
          <ul className="flex space-x-2 md:space-x-8">
            <NavItem 
              title="Universe" 
              href="#universe" 
              active={activeSection === 'universe'} 
              onClick={() => onNavigate('universe')} 
            />
            <NavItem 
              title="Events" 
              href="#events" 
              active={activeSection === 'events'} 
              onClick={() => onNavigate('events')} 
            />
            <NavItem
              title="Contact"
              href="#contact"
              active={activeSection === 'contact'}
              onClick={() => onNavigate('contact')}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
