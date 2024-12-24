import prisma from "@/lib/db";

export const getBookings = async (id_booking: number) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const bookings = await prisma.booking.findMany({
      where: {
        id_booking,
        tanggal_pemesanan: {
          gt: yesterday,
        },
      },
    });

    return bookings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
