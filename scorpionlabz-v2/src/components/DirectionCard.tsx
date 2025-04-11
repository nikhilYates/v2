import React from "react";

interface DirectionCardProps {
  direction: any;
}

export default function DirectionCard({ direction }: DirectionCardProps) {
  return (
    <>
        <div className="w-full h-full flex flex-col justify-start items-center p-8 bg-black/20 backdrop-blur-md rounded-xl hover:bg-black/50 transition-all duration-300 ease-in-out border border-white/10">
            <div className="flex flex-col gap-16 w-full">
                <h1 className="text-white 2xl:text-2xl font-bold text-left">
                    {direction.title}
                </h1>
                <p className="text-white text-lg font-regular text-left w-full">
                    {direction.description}
                </p>
            </div>
        </div>
  </>
  )
}