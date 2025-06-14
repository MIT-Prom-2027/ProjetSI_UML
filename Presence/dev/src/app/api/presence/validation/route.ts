import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { is_valid, id_presence } = body;
  try {
    const presence = await Prisma.presence.findUnique({
      where: { id: id_presence },
    });
    if (presence) {
      const updatedPresence = await Prisma.presence.update({
        where: { id: id_presence },
        data: { is_valid: is_valid },
      });
      return NextResponse.json(updatedPresence);
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Presence non trouée" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
