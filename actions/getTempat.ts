import prisma from "@/lib/db";

export const getTempat = async (id: number) => {
  try {
    const tempatDuduk = await prisma.tempat.findMany({
      where: {
        id_transportasi: id,
      },
    });

    return tempatDuduk;
  } catch (error: any) {
    console.error("Error fetching destinations:", error);
    throw new Error("Error fetching destinations");
  }
};
