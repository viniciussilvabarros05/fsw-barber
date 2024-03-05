"use client"

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbeshopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbeshopItemProps) => {
  const router = useRouter()
  function handleBookingClick(){
    router.push(`/barbershops/${barbershop.id}`)
  }
  return (
    <Card className="min-w-[167px] max-w-[167px] roudend-2xl">
      <CardContent className="px-1">
        <div className="px-1 w-full h-[159px] relative mb-1">
          <div className="absolute top-3 left-3 z-50">
            <Badge className="flex items-center opacity-90 gap-1" variant="secondary">
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            className=" rounded-2xl"
            src={barbershop.imageUrl}
            fill
            alt={barbershop.name}
          />
        </div>
        <div className="px-2 pb-0">
          <h2 className="font-bold overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>
            Reservar
          </Button>
        </div>
      </CardContent>

      
    </Card>
  );
};

export default BarbershopItem;
