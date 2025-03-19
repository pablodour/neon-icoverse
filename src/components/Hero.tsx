
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

const Logo = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Slow rotation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    
    // Subtle "breathing" effect
    const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Icosahedron args={[1, 1]} ref={meshRef}>
      <Wireframe thickness={0.015} />
      <meshStandardMaterial 
        color="black"
        emissive="#39FF14"
        emissiveIntensity={0.2}
        wireframe={true}
        transparent={true}
        opacity={0.7}
      />
    </Icosahedron>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
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
            src="https://player.vimeo.com/external/438342164.sd.mp4?s=94a01d4da412ead6c6d65e111d0db39be1dc098b&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        <div 
          className="mb-12 w-64 h-64 sm:w-80 sm:h-80"
          aria-hidden="true"
        >
          <Canvas 
            camera={{ position: [0, 0, 3.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#39FF14" />
            <Logo />
          </Canvas>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 animate-fade-in neon-text">
          Bad Habits Web
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

export default Hero;
