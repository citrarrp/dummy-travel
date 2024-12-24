// import { getBookings } from "@/actions/getBookings";
// import { getDestinationsById } from "@/actions/getDestinationsById";
// // import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
// import { notFound } from "next/navigation";

// interface detailDestinasi {
//   params: {
//     id_destinasi: number;
//   };
// }

// const DestinasiDetail = async ({ params }: detailDestinasi) => {
//   const destinasi = await getDestinationsById(params.id_destinasi);

//   if (!destinasi) {
//     return notFound();
//   }

//   const bookings = await getBookings(destinasi.id_destinasi);

//   return (
//     <div>
//       {/* <DestinasiDetail destinasi={destinasi} bookings={bookings} /> */}
//     </div>
//   );
// };

// export default DestinasiDetail;
import prisma from "@/lib/db";

// export const getSeatsByTransportasi = async (id_transportasi: number) => {
//   const seats = await prisma.transportasi.findUnique({
//     where: { id_transportasi : id_transportasi }
//   });
//   return seats?.kapasitas;
// };

// export const getSeatsByTransportasi = async (
//   id_transportasi: number,
//   seatClass: string
// ) => {
//   const count = await prisma.tempat.count({
//     where: {
//       id_transportasi: id_transportasi,
//       kelas: seatClass,
//     },
//   });

//   return count;
// };

export const getSeatsByTransportasi = async (
  id_transportasi: number,
  seatClass: string
) => {
  try {
    const seats = await prisma.tempat.findMany({
      where: {
        id_transportasi: id_transportasi,
        kelas: seatClass,
      },
    });

    console.log(id_transportasi, seatClass, seats);
    return seats;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw new Error("Error fetching seats");
  }
};
