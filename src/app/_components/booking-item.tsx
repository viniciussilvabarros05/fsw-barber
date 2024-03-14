import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  return (
    <Sheet>
      <SheetTrigger>
        <Card className="min-w-full">
          <CardContent className="p-5 py-0 flex flex-row justify-between flex-[0.8]">
            <div className="py-5 flex flex-col gap-3">
              <Badge
                className="w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">Corte de Cabelo</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-5 flex-[0.2]">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh':'mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="text-left pb-6 border-b border-solid border-secondary px-5">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative h-[180px] w-full mt-6">
          <Image
            src="/barber-map.png"
            fill
            style={{ objectFit: "contain" }}
            alt={booking.barbershop.name}
          />
          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card className="mx-5">
              <CardContent className="flex gap-2 p-3 items-center justify-start">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>

                <div className="flex flex-col justify-start">
                  <h2 className="font-bol">{booking.barbershop.name}</h2>
                  <h3 className="text-xs overflow-hiddden text-nowrap text-ellipsis">
                    {booking.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        <Badge
            className="w-fit mx-5 my-2"
            variant={isBookingConfirmed ? "default" : "secondary"}
        >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
        </Badge>
        <div className="py-6 px-5 bprder-1 border-solid border-secondary border-t ">
          <Card>
            <CardContent className="p-3 gap-3 flex flex-col ">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "HH':'mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
