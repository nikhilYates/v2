"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const handleScroll = (link: string) => {
  const navbarHeight = 80; // Approximate height of navbar in pixels

  if (link === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
  }
  const element = document.getElementById(link);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent hydration mismatch

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Calculate styles based on scroll position
  const transitionPoint = 250;
  const progress = Math.min(scrollPosition / transitionPoint, 1);
  const pastTransitionPoint = scrollPosition >= transitionPoint;
  
  // Calculate gap: start at 32rem (large gap) and decrease to 2rem (small gap)
  const gap = 32 - (progress * 30);

  useEffect(() => {
    // Handle initial width check and resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-auto flex flex-row items-center p-8 fixed top-0 left-0 backdrop-blur-md bg-opacity-50 bg-black/10 z-50">
      <div 
        className={`w-full flex flex-row items-center md:px-24 transition-all duration-300 ease-in-out justify-between xl:${pastTransitionPoint ? 'justify-center' : 'justify-between'}`}
        style={{
          gap: isMobile ? '0' : `${gap}rem`
        }}
      >
        <Image 
          onClick={() => handleScroll('home')}
          src="/assets/image/labz_2.png" 
          alt="logo" 
          width={75} 
          height={75} 
          className="transition-all duration-300 ease-in-out opacity-80 hover:opacity-100 hover:cursor-pointer"
        />
        
        {/* Mobile burger menu button */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile menu */}
        <div className={`md:hidden fixed inset-0 bg-black/90 h-screen backdrop-blur-md transition-all ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="text-white text-2xl font-light">Direction</p>
            <p className="text-white text-2xl font-light">About</p>
            <p className="text-white text-2xl font-light">Work</p>
            <p className="text-white text-2xl font-light">Services</p>
            <p className="text-white text-2xl font-light">Contact</p>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex flex-row gap-8 justify-start align-top transition-all duration-300 ease-in-out border-white rounded-xl">
          <p onClick={() => handleScroll('direction')} className="text-white/60 hover:text-white transition-colors text-lg font-light hover:cursor-pointer">Direction</p>
          <p onClick={() => handleScroll('clients')} className="text-white/60 hover:text-white transition-colors text-lg font-light hover:cursor-pointer">Clients</p>
          {/* <p className="text-white text-lg font-light">About</p> */}
          {/* <p className="text-white text-lg font-light">Work</p> */}
          <p onClick={() => handleScroll('services')} className="text-white/60 hover:text-white transition-colors text-lg font-light hover:cursor-pointer">Services</p>
          {/* <p className="text-white text-lg font-light">Contact</p> */}
        </div>
      </div>
    </div>
  );
}