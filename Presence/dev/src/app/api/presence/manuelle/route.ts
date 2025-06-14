import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id_user, status } = body;

  try {
    const now = new Date();
    const localNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const cours = await Prisma.cours.findMany({
      where: {
        date_deb: { lte: localNow },
        date_fin: { gte: localNow },
      },
    });
    if (cours.length > 0) {
      const presenceExiste = await Prisma.presence.findMany({
        where: {
          id_etudiant: id_user,
          id_cours: cours[0].id,
        },
        include: {
          do_presence: true,
          to_course: {
            include: {
              has_matiere: true,
            },
          },
        },
      });
      if (presenceExiste.length > 0) {
        return new NextResponse(
          JSON.stringify({ message: "Vous avez déjà fait une présence" }),
          {
            status: 409,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        try {
          const presence = await Prisma.presence.create({
            data: {
              id_cours: cours[0].id,
              id_etudiant: id_user,
              status: status,
            },
          });
          if (presence) {
            return NextResponse.json(presence);
          }
        } catch (error) {
          return new NextResponse(
            JSON.stringify({ message: "Utilisateur non existant" }),
            {
              status: 401,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Aucun cours disponible" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}
