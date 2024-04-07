import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { hotelId: string } }
) {
  try {
    const body = await req.json();
    const { userId } = auth();

    if (!params.hotelId) {
      return new NextResponse("Hotel id is required.", { status: 400 });
    }
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hotel = await prisma.hotel.update({
      where: {
        id: params.hotelId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(hotel);
  } catch (error) {
    console.log("ERR at /api/hotel/hotelId PATCH", error);
    return new NextResponse("Internl server error", { status: 500 });
  }
}
