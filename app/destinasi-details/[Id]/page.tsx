// import { getHotelById } from "@/actions/getHotelById";
// import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
// import { notFound } from "next/navigation";

// interface HotelDetailsPageProps {
//   params: {
//     hotelId: string;
//   };
// }

// const hotelDetailsPage = async ({ params }: HotelDetailsPageProps) => {
//   const hotel = await getHotelById(params.hotelId);

//   if (!hotel) {
//     return notFound();
//   }
//   return (
//     <div>
//       <HotelDetailsClient hotel={hotel} />
//     </div>
//   );
// };

// export default hotelDetailsPage;

import { getBookings } from "@/actions/getBookings";
import { getDestinationsById } from "@/actions/getDestinationsById";
// import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
import { notFound } from "next/navigation";

interface detailDestinasi {
  params: {
    id_destinasi: number;
  };
}

const DestinasiDetail = async ({ params }: detailDestinasi) => {
  const destinasi = await getDestinationsById(params.id_destinasi);

  if (!destinasi) {
    return notFound();
  }

  const bookings = await getBookings(destinasi.id_destinasi);

  return (
    <div>
      {/* <DestinasiDetail destinasi={destinasi} bookings={bookings} /> */}
    </div>
  );
};

export default DestinasiDetail;
