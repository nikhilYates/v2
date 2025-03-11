import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full h-auto flex flex-row justify-between items-center">
        <Image src="/assets/image/labz_2.png" alt="logo" width={100} height={100} />
        <div className="flex flex-col gap-4 justify-start align-top">

        </div>
    </div>
  );
}