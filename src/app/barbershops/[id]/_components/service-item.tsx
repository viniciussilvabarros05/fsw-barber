"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState(new Date())
  const [hour, setHour] = useState<string|undefined>()
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const timeList = useMemo(()=>{
    return date? generateDayTimeList(date): []
  },[date])

  const handleHourClick = (time: string)=>{
    setHour(time)
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>


                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>
                      Fazer Reserva
                    </SheetTitle>
                  </SheetHeader>

                  <Calendar
                  mode="single"
                  className="mt-6"
                  locale={ptBR}
                  selected={date}
                  styles={{
                    head_cell:{
                      width:"100%",
                    },
                    cell: {
                      width:"100%",
                    },
                    button:{
                      width:"100%",
                    },
                    nav_button_previous:{
                      width:"32px",
                      height:"32px"
                    },
                    nav_button_next:{
                      width:"32px",
                      height:"32px"
                    },
                    caption:{
                      textTransform: "capitalize",
                    }
                  }}
                  />
                  {date && (
                    <div className="py-6 px-5 border-y border-solid border-secondary flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {
                        timeList.map((time)=>(
                          <Button key={time} variant={hour===time? "default":"outline" }className="rounded-full" onClick={()=>handleHourClick(time)}>
                            {time}
                          </Button>
                        ))
                      }
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
