import prisma from "../prisma";
import { AnneeUniversitaire } from "./AnneeUniversitaire";
import { Ecue } from "./Ecue";
import { Professor } from "./Professor";

export class Enseignement {
  private enseignementId: number;
  public professorId: string;
  public auId: number;
  public ecueId: number;

  constructor(
    enseignementId: number,
    professorId: string,
    ecueId: number,
    auId: number
  ) {
    this.enseignementId = enseignementId;
    this.professorId = professorId;
    this.ecueId = ecueId;
    this.auId = auId;
  }

  public getEnseignementId(): number {
    return this.enseignementId;
  }

  public setEnseignementId(enseignementId: number) {
    this.enseignementId = enseignementId;
  }

  public static async affecterEcueProfesseur(
    ecue: Ecue,
    professor: Professor,
    au: AnneeUniversitaire
  ): Promise<Enseignement | string | null> {
    try {
      const res = await prisma.enseignement.create({
        data: {
          ecueId: ecue.getEcueId(),
          professorId: professor.getProfessorId(),
          auId: au.getAuId(),
        },
      });

      return new Enseignement(
        res.enseignementId,
        res.professorId,
        res.ecueId,
        res.auId
      );
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return null;
    }
  }
}
