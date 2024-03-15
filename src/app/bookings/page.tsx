import { isFuture, isPast } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { Card } from "../_components/ui/card";
import { db } from "../_lib/prisma";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  const bookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any)?.id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking) =>
    isFuture(booking.date)
  );
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>

      <h2 className="px-5 mb-3 font-bold text-gray-400 uppercase text-sm">
        Confirmados
      </h2>

      <div className="flex flex-col px-5 gap-3">
        {confirmedBookings.length == 0 && (
          <Card className="py-4">
            <h2 className="text-gray-400 text-center ">
              Você não possui agendamentos
            </h2>
          </Card>
        )}
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>

      <h2 className="px-5 mb-3 mt-6 font-bold text-gray-400 uppercase text-sm">
        Finalizados
      </h2>

      <div className="flex flex-col px-5 gap-3">
      {finishedBookings.length == 0 && (
          <Card className="py-4">
            <h2 className="text-gray-400 text-center ">
              Você não possui serviços finalizados
            </h2>
          </Card>
        )}
        {finishedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default BookingsPage;
