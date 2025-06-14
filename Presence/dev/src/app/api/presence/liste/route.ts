import Prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listpresence = await Prisma.presence.findMany({
      where: { is_valid: true },
      include: {
        do_presence: true,
        to_course: {
          include: {
            has_matiere: true,
          },
        },
      },
    });

    if (listpresence.length > 0) {
      return NextResponse.json(listpresence);
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Aucune présence actuellement" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Erreur serveur", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
