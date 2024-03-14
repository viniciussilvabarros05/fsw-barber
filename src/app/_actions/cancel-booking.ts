"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelBookking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
  return revalidatePath("/bookings");
};
