import Lavendry from '@/../public/assets/image/lavendry.jpeg'
import Image from 'next/image'

export default function SquareGradient() {
  return ( 
    <div className='w-full h-full aspect-square rounded-full' style={{backgroundImage: `url(${Lavendry.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    </div>
  )
}