import prisma from "../prisma";
import { AnneeUniversitaire } from "./AnneeUniversitaire";
import { Creneau } from "./Creneau";
import { Professor } from "./Professor";

export class CreneauLibre {
  private creneauLibreId: number;
  public professorId: string;
  public creneauId: number;
  public auId: number;

  constructor(
    creneauLibreId: number,
    professorId: string,
    creneauId: number,
    auId: number
  ) {
    this.creneauLibreId = creneauLibreId;
    this.creneauId = creneauId;
    this.professorId = professorId;
    this.auId = auId;
  }

  public getCreneauLibreId(): number {
    return this.creneauLibreId;
  }

  public setCreneauLibreId(id: number) {
    this.creneauLibreId = id;
  }

  public static async affecterCreneauProfesseur(
    creneau: Creneau,
    professeur: Professor,
    au: AnneeUniversitaire
  ): Promise<CreneauLibre> {
    const res = await prisma.creneauLibre.create({
      data: {
        creneauId: creneau.getCreneauId(),
        professorId: professeur.getProfessorId(),
        auId: au.getAuId(),
      },
    });

    return new CreneauLibre(
      res.creneauLibreId,
      res.professorId,
      res.creneauId,
      res.auId
    );
  }
}
