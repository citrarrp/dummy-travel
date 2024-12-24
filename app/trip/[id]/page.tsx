import { getBookings } from "@/actions/getBookings";
import { getDestinationsById } from "@/actions/getDestinationsById";
import { notFound } from "next/navigation";
import DestinasiDetail from "@/components/destinasiDetail";

interface detailDestinasi {
  params: {
    id: number;
  };
}

const DestinasiDetailPage = async ({ params }: detailDestinasi) => {
  const idDestinasi = Number(params.id);

  const destinasi = await getDestinationsById(idDestinasi);

  if (!destinasi) {
    return notFound();
  }

  const bookings = await getBookings(destinasi.id_destinasi);

  return <DestinasiDetail destinasi={destinasi} />;
};

export default DestinasiDetailPage;
