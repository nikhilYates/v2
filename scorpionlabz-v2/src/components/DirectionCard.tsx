import React from "react";

interface DirectionCardProps {
  direction: any;
}

export default function DirectionCard({ direction }: DirectionCardProps) {
  return (
    <>
        <div className="w-full h-full flex flex-col justify-start items-center p-8 bg-black/20 backdrop-blur-sm rounded-xl hover:border-white/80 hover:backdrop-blur-md transition-all duration-500 ease-in-out border border-white/40 text-white/40 hover:text-white/100">
            <div className="flex flex-col gap-16 w-full">
                <h1 className="2xl:text-2xl font-bold text-left">
                    {direction.title}
                </h1>
                <p className="text-lg font-regular text-left w-full">
                    {direction.description}
                </p>
            </div>
        </div>
  </>
  )
}