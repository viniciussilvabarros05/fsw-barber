"use client"
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
  isAuthenticated:boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {

  const handleBookingClick = ()=>{
    if(!isAuthenticated){
      return signIn("google")
    }
  }

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-100px max-w-[110px]">
            <Image
              src={service.imageUrl || ""}
              style={{ objectFit: "contain" }}
              alt={service.name}
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col w-full justify-between h-[110px]">
            <div>
              <h2 className="font-bold text-sm">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
