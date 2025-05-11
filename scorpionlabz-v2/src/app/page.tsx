"use client"

import Image from "next/image";
import Layout from "../layouts/Layout";
import About from "./about/page";
import Clients from "./clients/page";
import Contact from "./contact/page";
import Direction from "./direction/page";
import Work from "./work/page";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Blob from "@/components/Blob";
import MobileBlob from "@/components/MobileBlob";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Services from "./services/page";
import Footer from "@/components/Footer";

const navbarHeight = 80;

const handleScroll = (link: string) => {
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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }

    // Set initial state after component mounts
    setIsMobile(window.innerWidth < 1024); // 1024px is typical laptop breakpoint

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <Layout>
        <div className="h-full w-full flex flex-col p-8 relative justify-center items-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10 scale-110"
          >
            <source src="/assets/video/landing-hero-background.mp4" type="video/mp4" />
          </video>
          <Image src="/assets/image/labz_2.png" alt="logo" width={400} height={400} />
          <p className="text-white text-lg font-light text-center">View on desktop for the full experience</p>
        </div>  
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full w-full flex flex-col relative justify-end xl:justify-center gap-[25%] overflow-hidden pb-8 p-0 xl:p-8 bg-black">
        <Navbar />
        <div className="absolute pr-8 top-0 w-full h-full flex items-start justify-center z-0">
          <Blob />
        </div>
        <div className="p-8 xl:p-32 flex flex-col gap-4 z-10">
          <h1 className="text-6xl xl:text-6xl 2xl:text-8xl font-extralight text-white">Modern Solutions for <br /> Modern Businesses</h1>
          <p className="text-white text-xl font-light w-full xl:w-1/2 2xl:w-1/3 2xl:text-2xl">Experience a software solutions house that focuses on delivering you <span className="font-bold"> cutting edge, sustainable</span> solutions.</p>
          <div className="flex flex-row justify-start align-middle pt-8 gap-4">
            <Button onClick={() => handleScroll('direction')} variant={'outline'} className="w-fit font-semibold">
              The Mission
            </Button>
            <Separator orientation="vertical" className="h-full hidden xl:block" />
            <Button onClick={() => handleScroll('services')} variant={"default"} className="w-fit font-semibold">
              Our Services
            </Button>
          </div>
        </div>
        <div className="hidden xl:flex absolute bottom-0 xl:-left-1/4 w-full justify-start opacity-10">
          <img 
            src="/assets/image/rising-moon.png" 
            alt="Bottom Image" 
            className="w-[200%] 2xl:w-[100%] h-auto xl:rotate-90"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] xl:h-[50vh] bg-gradient-to-t from-black to-transparent pointer-events-none -z-5"></div>
      </div>  
      <Direction />
      <Services />
      <Clients />
      <Contact />
      <Footer />
    </Layout>
  );
}