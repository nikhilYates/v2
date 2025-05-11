import { FC } from 'react';
import ServiceCard from '@/components/ServicesCard';
import servicedata from '@/../public/assets/services/services.json'

interface Service {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

interface ServicesData {
  services: Service[];
}

export default function Services() {

    const servicesData: ServicesData = {
        services: servicedata.services
    }

  return (
    <div id="services" className="w-full flex flex-col h-auto justify-start gap-4 items-center p-8 2xl:p-16 bg-black relative pb-8">
        <h1 className="text-white text-4xl 2xl:text-7xl font-regular text-center">What We Do</h1>
        <p className="text-white text-xl font-medium text-center w-full 2xl:w-1/2 relative z-10">
          We do what we do, and we do it well. Each project is treated with the same level of attention and crafsmanship - our signature is quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16">
        {servicesData.services.map((service, index) => (
            <ServiceCard key={index} service={service} />
        ))}
        </div>
    </div>
  );
};