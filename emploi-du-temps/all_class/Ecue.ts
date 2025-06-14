import prisma from "../prisma";
import { Professor } from "./Professor";

export class Ecue {
  private ecueId: number;
  public name: string;
  public credits: number;

  constructor(ecueId: number, name: string, credits: number) {
    this.ecueId = ecueId;
    this.name = name;
    this.credits = credits;
  }

  public getEcueId(): number {
    return this.ecueId;
  }
  public setEcueId(ecueId: number) {
    this.ecueId = ecueId;
  }

  public async getProfessors(): Promise<Professor[] | string | null> {
    try {
      const res = await prisma.enseignement.findMany({
        where: {
          ecueId: this.ecueId,
        },
        include: {
          professor: {
            include: {
              person: true,
            },
          },
        },
      });

      return res.map((r) => {
        const { professor } = r;
        return new Professor(
          professor.professorId,
          professor.personId,
          professor.person.lastname,
          professor.person.userId,
          professor.person.lastname
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return null;
    }
  }
}
