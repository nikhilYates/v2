import React from "react";
import Image from "next/image";

const clients = [
  { name: "CVL", logo: "/assets/clients/cvl.svg" },
  { name: "Strive", logo: "/assets/clients/strive.png" },
  { name: "SDP", logo: "/assets/clients/sdp.png" },
  { name: "DC", logo: "/assets/clients/dc.png" },
  { name: "CH", logo: "/assets/clients/ch.png" },
];

export default function Clients() {
  return(
    <div className="w-full flex flex-col h-screen justify-start gap-16 items-center p-8 2xl:p-16 bg-black relative">
      <h1 className="text-white text-4xl 2xl:text-7xl font-regular text-center">
        Trusted By
      </h1>
      <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
        {clients.map((client, index) => (
          <div
            key={index}
            className="w-full aspect-[3/2] relative grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
