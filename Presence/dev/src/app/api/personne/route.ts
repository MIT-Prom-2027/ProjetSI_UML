import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nom, prenom, mdp, email, role } = body;
  try {
    const hashedmdp = await hash(mdp, 12);
    const newPerson = await Prisma.personne.create({
      data: {
        nom: nom,
        prenom: prenom,
        mdp: hashedmdp,
        email: email,
        role: role,
      },
    });
    if (newPerson) {
      return NextResponse.json(newPerson);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
