// import prisma from "@/lib/db";

// export const getPackageDetailsByIdPackage = async (idPackage: number) => {
//   try {
//     // Ambil semua package_transport_detail berdasarkan id_package
//     const packageDetails = await prisma.package_transport_detail.findMany({
//       where: {
//         id_package: idPackage,
//       },
//       include: {
//         transportasi: true, // Include relasi transportasi untuk detail lebih lanjut
//       },
//       orderBy: {
//         urutan_rute: 'asc', // Urutkan berdasarkan urutan_rute
//       }
//     });

//     return packageDetails;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };
