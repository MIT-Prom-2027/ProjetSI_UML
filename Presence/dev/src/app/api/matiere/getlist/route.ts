import Prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await Prisma.matiere.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
