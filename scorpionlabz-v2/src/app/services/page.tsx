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
    <div className="w-full flex flex-col h-screen justify-start gap-4 items-center p-8 2xl:p-16 bg-black relative">
        <h1 className="text-white text-4xl 2xl:text-7xl font-regular text-center">What We Do</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16">
        {servicesData.services.map((service, index) => (
            <ServiceCard key={index} service={service} />
        ))}
        </div>
    </div>
  );
};