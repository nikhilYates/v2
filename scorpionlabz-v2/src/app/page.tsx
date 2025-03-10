"use client"

import Image from "next/image";
import Layout from "../layouts/Layout";
import  About from "./about/page";
import Clients from "./clients/page";
import Contact from "./contact/page";
import Direction from "./direction/page";
import Work from "./work/page";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

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
        <Image src="/assets/image/labz_2.png" alt="logo" width={200} height={200} />
        change is coming soon
      </div>  
      {/* <About />
      <Clients />
      <Contact />
      <Direction />
      <Work /> */}
    </Layout>
  );
}
