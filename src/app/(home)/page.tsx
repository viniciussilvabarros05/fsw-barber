import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_component/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_component/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { Card } from "../_components/ui/card";
import { NextRequest } from "next/server";

export default async function Home(req:NextRequest) {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any)?.id,
          date:{
            gte: new Date()
          }
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
    : [];

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
       
        <h2 className="text-xl font-bold">
        {session?.user? 
        `Olá, ${session.user.name?.split(" ")[0]}!`: "Olá! Vamos agendar um corte hoje?"}

        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE ',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          {session?.user  && 
          "Agendamentos"
          
          }
         
        </h2>

        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden pr-4">
        {session?.user &&  bookings.length == 0 && (
          <Card className="py-4 w-full mx-4">
            <h2 className="text-gray-400 text-center">
              Você não possui agendamentos
            </h2>
          </Card>
        )}
          {bookings.map((booking) => (
            <div className="min-w-[90%] max-w-full ml-5" key={booking.id}>
              <BookingItem key={booking.id} booking={booking} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          {" "}
          Recomendados
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden mb-[4.5rem]">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id}  barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
}
