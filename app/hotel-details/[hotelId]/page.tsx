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
import { getHotelById } from "@/actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
import { notFound } from "next/navigation";

interface HotelDetailsPageProps {
  params: {
    hotelId: string;
  };
}

const HotelDetailsPage = async ({ params }: HotelDetailsPageProps) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) {
    return notFound();
  }

  const bookings = await getBookings(hotel.id);

  return (
    <div>
      <HotelDetailsClient hotel={hotel} bookings={bookings} />
    </div>
  );
};

export default HotelDetailsPage;
