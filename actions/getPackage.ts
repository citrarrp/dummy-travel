import prisma from "@/lib/db";

// Fungsi untuk mengambil package berdasarkan id_destinasi
export const getPackagebyIdDestinasi = async (idDestinasi: number) => {
  try {
    // Kembalikan array statis [1, 2, 3] tanpa menjalankan query ke database
    return [1, 2, 3];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
