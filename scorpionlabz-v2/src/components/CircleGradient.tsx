import BlueRays from '@/../public/assets/image/blue-rays.jpeg'
import Image from 'next/image'
export default function CircleGradient() {
  return ( 
    <div className='w-full h-full aspect-square rounded-full' style={{backgroundImage: `url(${BlueRays.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    </div>
  )
}