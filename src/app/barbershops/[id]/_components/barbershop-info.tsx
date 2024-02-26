"use client"

import { Button } from "@/app/_components/ui/button";
import { Barbershop, Prisma, Service } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarberShopInfoProps{
    barbershop: Barbershop,
}

const BarberShopInfo = ({barbershop}: BarberShopInfoProps) => {

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size={"icon"}
          variant="outline"
          className="z-50 absolute top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size={"icon"}
          variant="outline"
          className="z-50 absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
        <Image
          src={barbershop.imageUrl}
          
          alt={barbershop.name}
          style={{ objectFit: "cover", width:"100%", height:"100%"}}
          width={150}
          height={150}
          className="opacity-75"
        />
      </div>

      <div className="flex flex-col px-5 py-3 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>


      </div>
    </div>
  );
};

export default BarberShopInfo;