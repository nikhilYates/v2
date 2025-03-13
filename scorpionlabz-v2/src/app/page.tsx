"use client"

// import Image from "next/image";
import Layout from "../layouts/Layout";
// import About from "./about/page";
// import Clients from "./clients/page";
// import Contact from "./contact/page";
// import Direction from "./direction/page";
// import Work from "./work/page";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Blob from "@/components/Blob";
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <Layout>
      <div className="h-full w-full flex flex-col p-24 relative justify-top overflow-hidden">
        {/* <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-15 scale-110"
        >
          <source src="/assets/video/landing-hero-background.mp4" type="video/mp4" />
        </video> */}
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10 bg-white">
          <Blob />
        </div>
      </div>  
      {/* <About />
      <Clients />
      <Contact />
      <Direction />
      <Work /> */}
    </Layout>
  );
}