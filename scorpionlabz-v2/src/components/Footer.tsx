"use client"
import React from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

import instagramWhite from '@/../public/assets/vectors/instagramWhite.svg'
import linkedinWhite from '@/../public/assets/vectors/linkedinWhite.svg';
import whiteScorp from '@/../public/assets/image/whiteScorp_full.png'

export const handleScroll = (link: string) => {

    if (link === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = document.getElementById(link);
    element?.scrollIntoView({ behavior: 'smooth' });
};


const Footer = () => {

    return (
        <div 
            className="h-[90vh] lg:h-[70vh] w-full flex flex-col justify-between relative bg-black p-8 lg:p-16"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95)), url(${whiteScorp.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left',
            }}
        >   
            <div className='flex flex-col h-full justify-between'>
                <div className='flex flex-col w-fit gap-4 justify-start align-top'>
                    <Separator orientation={'horizontal'} />
                    <a onClick={() => handleScroll('home')} className='text-white/80 hover:text-white transition-colors text-lg cursor-pointer'>Home</a>
                    <a onClick={() => handleScroll('direction')} className='text-white/80 hover:text-white transition-colors text-lg cursor-pointer'>Direction</a>
                    <a onClick={() => handleScroll('clients')} className='text-white/80 hover:text-white transition-colors text-lg cursor-pointer'>Clients</a>
                    <a onClick={() => handleScroll('services')} className='text-white/80 hover:text-white transition-colors text-lg cursor-pointer'>Services</a>
                </div>
                <div className='w-full flex flex-row justify-between'>
                    <div className='flex flex-row justify-start gap-4 '>
                        <a href="https://www.instagram.com/scorpionlabz/profilecard/?igsh=MW5saDRyc2kyY2Q2cw==" target="_blank" rel="noopener noreferrer">
                            <Image priority src={instagramWhite} alt='github logo' className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity'/>
                        </a>
                        <a href="https://www.linkedin.com/company/scorpionlabz" target="_blank" rel="noopener noreferrer">
                            <Image priority src={linkedinWhite} alt='linkedin logo' className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity'/>
                        </a>
                    </div>
                    <p className='text-zinc-600 transition-colors text-lg'>Scorpion Labz © 2024</p>
                </div>
            </div>
        </div>
    )

}

export default Footer