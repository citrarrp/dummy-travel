import prisma from "@/lib/db";

export const getDestinations = async (searchParams: { title: string }) => {
  try {
    const { title } = searchParams;

    const destinasi = await prisma.destinasi.findMany({
      where: {
        nama_destinasi: {
          contains: title,
        },
      },
    });

    return destinasi;
  } catch (error: any) {
    console.error("Error fetching destinations:", error);
    throw new Error("Error fetching destinations");
  }
};
