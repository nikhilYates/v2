import React from "react";
import DirectionCard from "@/components/DirectionCard";
import directionData from "../../../public/assets/direction/direction.json";


export default function Direction() {
  return <div className="w-full flex flex-col justify-start items-center p-8 2xl:p-16 bg-black border border-white/10">
    <div className="flex flex-col gap-4 w-full items-center">
      <h1 className="text-white text-4xl 2xl:text-7xl font-regular text-center">
        Our Direction
      </h1>
      <p className="text-white text-xl font-medium text-center w-full 2xl:w-1/3">
        Motivated by the need to create a more sustainable future, we are a software solutions house that focuses on delivering you cutting edge, sustainable solutions.
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 w-full mt-16 p-16">
        {directionData.directions.map((direction: any) => (
          <DirectionCard key={direction.id} direction={direction} />
        ))}
      </div>
    </div>
  </div>;
}
