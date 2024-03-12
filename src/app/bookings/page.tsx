import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  const bookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any)?.id,
    },
    include:{
      service:true,
      barbershop:true
    }
  });

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>

      <h2 className="px-5 mb-3 font-bold text-gray-400 uppercase text-sm">Confirmados</h2>
      
      <div className="flex flex-col px-5 gap-3">
        {bookings?.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>

      <h2 className="px-5 mb-3 mt-6 font-bold text-gray-400 uppercase text-sm">Finalizados</h2>
      
      <div className="flex flex-col px-5 gap-3">
        {bookings?.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default BookingsPage;
