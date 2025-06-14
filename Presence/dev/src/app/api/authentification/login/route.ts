import Prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, mdp } = body;
  const finduser = await Prisma.personne.findUnique({
    where: { email: email },
  });
  if (finduser) {
    const comparemdp = await compare(mdp, finduser.mdp);
    if (comparemdp) {
      return NextResponse.json(finduser);
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Mot de passe incorrect" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "User non trouvé" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
