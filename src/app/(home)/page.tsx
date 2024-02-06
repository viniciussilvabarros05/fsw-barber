import Header from "./_component/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_component/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_component/barbershop-item";
export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE ',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">
          {" "}
          Agendamentos
        </h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          {" "}
          Recomendados
        </h2>
      </div>
      <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map(barbershop=>(
          <BarbershopItem barbershop={barbershop}/>
        ))}
      </div>
    </div>
  );
}
