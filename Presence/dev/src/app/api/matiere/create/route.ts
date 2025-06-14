import Prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { titre } = body;
  try {
    const newMatiere = await Prisma.matiere.create({
      data: {
        titre: titre,
      },
    });
    if (newMatiere) {
      return NextResponse.json(newMatiere);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}


