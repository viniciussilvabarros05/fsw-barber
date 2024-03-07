import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import BarberShopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPageProps {
  params: { id?: string };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);


  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });
  if (!barbershop) {
    return null;
  }
  return (
    <div>
      <BarberShopInfo barbershop={barbershop} />
      <div className="flex flex-col gap-3 px-5 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} barbershop={barbershop} isAuthenticated={!!session?.user} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
