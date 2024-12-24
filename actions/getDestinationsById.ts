import prisma from "@/lib/db";

// Update Destinasi type to allow null values
interface Destinasi {
  id_destinasi: number;
  nama_destinasi: string | null;
  deskripsi: string | null;
  lokasi: string | null;
  link_gambar: string | null;
  harga: number | null;
}

export const getDestinationsById = async (
  idDestinasi: number
): Promise<Destinasi | null> => {
  try {
    const destinasi = await prisma.destinasi.findUnique({
      where: {
        id_destinasi: idDestinasi,
      },
      // include: {
      //   location: true,
      // },
    });

    if (!destinasi) {
      return null;
    }

    return destinasi;
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    throw new Error("Failed to fetch destination.");
  }
};
