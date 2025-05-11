import React from "react";
import DirectionCard from "@/components/DirectionCard";
import directionData from "../../../public/assets/direction/direction.json";
import Image from "next/image";

export default function Direction() {
  return (
    <div className="w-full flex flex-col h-auto justify-start gap-16 items-center p-8 2xl:p-16 bg-black relative">
      <Image src="/assets/image/direction_bg.png" alt="Direction Background" width={1280} height={1280} className="absolute opacity-35 top-10 left-0 w-full h-full object-cover" />
      <div className="flex flex-col gap-8 w-full items-center relative">
        <h1 className="text-white text-4xl 2xl:text-7xl font-regular text-center">
          Our Direction
        </h1>
        <p className="text-white text-xl font-medium text-center w-full 2xl:w-1/2 relative z-10">
          Motivated by the need to create a more sustainable future, we are a software solutions house that focuses on delivering you cutting edge, sustainable solutions.
        </p>
      </div>
        <div className="w-full flex flex-col justify-start items-center">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 w-full pt-0 p-16 relative z-10">
            {directionData.directions.map((direction: any) => (
              <DirectionCard key={direction.id} direction={direction} />
            ))}
          </div>
        </div>
    </div>
  );
}
