import { firstday } from "@/lib/firstday";
import { lastday } from "@/lib/lastday";
import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  matiere?: string;
  period?: "semaine" | "mois" | "semestre";
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { matiere, period } = body;

  const start = firstday();
  const end = lastday();

  try {
    let dateFilter: any = {};
    if (period === "semaine") {
      dateFilter = {
        date_deb: { gte: start.debutSemaine },
        date_fin: { lte: end.finSemaine },
      };
    } else if (period === "mois") {
      dateFilter = {
        date_deb: { gte: start.debutMois },
        date_fin: { lte: end.finMois },
      };
    } else if (period === "semestre") {
      dateFilter = {
        date_deb: { gte: start.debutSemestre },
        date_fin: { lte: end.finSemestre },
      };
    }

    const cours = await Prisma.cours.findMany({
      where: {
        ...dateFilter,
        ...(matiere && {
          has_matiere: {
            titre: matiere,
          },
        }),
      },
      select: {
        id: true,
        id_matiere: true,
        date_deb: true,
        date_fin: true,
        has_matiere: {
          select: {
            id: true,
            titre: true,
          },
        },
      },
    });

    const idsCours = cours.map((c) => c.id);
    const presences = await Prisma.presence.findMany({
      where: {
        id_cours: { in: idsCours },
        is_valid: true,
      },
      include: {
        to_course: {
          include: {
            has_matiere: true,
          },
        },
        do_presence: true,
      },
    });

    const grouped: { [matiere: string]: typeof presences } = {};

    for (const presence of presences) {
      const titre = presence.to_course?.has_matiere?.titre || "Inconnue";
      if (!grouped[titre]) grouped[titre] = [];
      grouped[titre].push(presence);
    }

    return NextResponse.json([grouped]);
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
