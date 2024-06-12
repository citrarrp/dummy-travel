import { getHotelById } from "@/actions/getHotelById";
import HotelDetailsClient from "@/components/hotel/HotelDetailsClient";
import { notFound } from "next/navigation";

interface HotelDetailsPageProps {
  params: {
    hotelId: string;
  };
}

const hotelDetailsPage = async ({ params }: HotelDetailsPageProps) => {
  const hotel = await getHotelById(params.hotelId);

  if (!hotel) {
    return notFound();
  }
  return (
    <div>
      <HotelDetailsClient hotel={hotel} />
    </div>
  );
};

export default hotelDetailsPage;
