import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_presence, status } = body;
  try {
    const presenceupdate = await Prisma.presence.update({
      where: { id: id_presence },
      data: {
        is_valid: true,
        status: status,
      },
    });
    if (presenceupdate) {
      return NextResponse.json({ message: "Présence mise à jour" });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de la présene",
      }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }
}
