import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_matiere, date_deb, date_fin } = body;

  const debut = new Date(date_deb);
  const fin = new Date(date_fin);

  // Vérifie s’il existe un cours avec chevauchement
  const coursEnConflit = await Prisma.cours.findFirst({
    where: {
      OR: [
        {
          date_deb: {
            lte: fin,
          },
          date_fin: {
            gte: debut,
          },
        },
      ],
    },
  });

  if (coursEnConflit) {
    return new NextResponse(
      JSON.stringify({
        message: "Un cours a déjà lieu pendant cette période.",
      }),
      {
        status: 409, // Conflit
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Si aucun conflit, on crée le cours
    const newCours = await Prisma.cours.create({
      data: {
        id_matiere,
        date_deb: debut,
        date_fin: fin,
      },
    });

    return NextResponse.json(newCours);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const listcours = await Prisma.cours.findMany();
    return NextResponse.json(listcours);
  } catch (error) {
    return NextResponse.json(error);
  }
}
