
import React from 'react';
import { Mail, MapPin, Send, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-[50vh] bg-black py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact</h2>
          <p className="text-light/70 max-w-2xl mx-auto">
            Get in touch with BAD HABITS for bookings, partnerships, or general inquiries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glassmorphism p-8 rounded-lg flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-6 text-neon">Reach Out</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-neon mr-4" size={24} />
                <div>
                  <p className="text-sm text-light/60">Email</p>
                  <a href="mailto:contact@badhabits.no" className="text-light hover:text-neon transition-colors">
                    contact@badhabits.no
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="text-neon mr-4" size={24} />
                <div>
                  <p className="text-sm text-light/60">Location</p>
                  <p className="text-light">Oslo, Norway</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Instagram className="text-neon mr-4" size={24} />
                <div>
                  <p className="text-sm text-light/60">Social</p>
                  <a 
                    href="https://www.instagram.com/badhabits.oslo/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-light hover:text-neon transition-colors"
                  >
                    @badhabits.oslo
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-neon">Send a Message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-light/70 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-dark/50 border border-light/10 rounded-md p-2 text-light focus:border-neon focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-light/70 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-dark/50 border border-light/10 rounded-md p-2 text-light focus:border-neon focus:outline-none transition-colors"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-light/70 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-dark/50 border border-light/10 rounded-md p-2 text-light focus:border-neon focus:outline-none transition-colors resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="flex items-center justify-center w-full bg-neon text-dark font-medium py-2 rounded-md hover:bg-neon/80 transition-colors"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
