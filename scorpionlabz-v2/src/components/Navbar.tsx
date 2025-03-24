"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [scrollPosition, setScrollPosition] = useState(0);


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

  // Calculate styles based on scroll position
  const transitionPoint = 100;
  const progress = Math.min(scrollPosition / transitionPoint, 1);
  
  // Calculate gap: start at 32rem (large gap) and decrease to 2rem (small gap)
  const gap = 42 - (progress * 30);

  return (
    <div className="w-full h-auto flex flex-row items-center p-4 px-0 fixed top-0 left-0 backdrop-blur-md bg-opacity-50 bg-black/10 z-50">
      <div 
        className="w-full flex flex-row items-center justify-center px-24 transition-all duration-300 ease-in-out"
        style={{
          gap: `${gap}rem`
        }}
      >
        <Image 
          src="/assets/image/labz_2.png" 
          alt="logo" 
          width={75} 
          height={75} 
          className="transition-all duration-300 ease-in-out"
        />
        <div className="flex flex-row gap-8 justify-start align-top transition-all duration-300 ease-in-out border-white rounded-xl">
          <p className="text-white text-lg font-light">Direction</p>
          <p className="text-white text-lg font-light">About</p>
          <p className="text-white text-lg font-light">Work</p>
          <p className="text-white text-lg font-light">Services</p>
          <p className="text-white text-lg font-light">Contact</p>
        </div>
      </div>
    </div>
  );
}