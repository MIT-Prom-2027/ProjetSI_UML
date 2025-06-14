import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { matiere, date } = body;

    // ✅ Vérifie que les données sont fournies
    if (!matiere || !date) {
      return NextResponse.json(
        { error: "Le champ 'matiere' et 'date' sont requis." },
        { status: 400 }
      );
    }

    // ✅ Récupère la matière correspondante (avec findUnique, plus logique ici si titre est unique)
    const matiereCorresp = await Prisma.matiere.findUnique({
      where: { titre: matiere },
    });

    // ❌ Si la matière n'existe pas, on retourne une erreur
    if (!matiereCorresp) {
      return NextResponse.json(
        { error: "Matière non trouvée." },
        { status: 404 }
      );
    }

    // ✅ Récupère les cours liés à cette matière et à la date donnée
    const allCourses = await Prisma.cours.findMany({
      where: {
        id_matiere: matiereCorresp.id,
        date_deb: { lte: new Date(date) },
        date_fin: { gte: new Date(date) },
      },
    });

    // ✅ Si des cours sont trouvés, on les retourne
    if (allCourses.length > 0) {
      return NextResponse.json(allCourses);
    }

    // ❌ Sinon, on retourne un message d’erreur
    return NextResponse.json(
      {
        message:
          "Aucun cours correspondant à cette date pour la matière donnée.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("[ERREUR GET COURS]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération des cours." },
      { status: 500 }
    );
  }
}
