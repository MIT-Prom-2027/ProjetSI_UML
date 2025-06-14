import prisma from "../prisma";
import { AnneeUniversitaire } from "./AnneeUniversitaire";
import { Creneau } from "./Creneau";
import { CreneauLibre } from "./CreneauLibre";
import { Person } from "./Person";

export class Professor extends Person {
  private professorId: string;

  public getProfessorId(): string {
    return this.professorId;
  }

  public setAdminId(professorId: string) {
    this.professorId = professorId;
  }

  constructor(
    professorId: string,
    personId: string,
    lastname: string,
    userId: string,
    firstname?: string
  ) {
    super(personId, lastname, userId, firstname);
    this.professorId = professorId;
  }

  public async addCreneauLibre(
    creneau: Creneau,
    au: AnneeUniversitaire
  ): Promise<CreneauLibre | null> {
    const id = creneau.getCreneauId();
    const auId = au.getAuId();

    const { creneauId, creneauLibreId } = await prisma.creneauLibre.create({
      data: {
        creneauId: id,
        auId,
        professorId: this.getProfessorId(),
      },
    });

    return new CreneauLibre(
      creneauLibreId,
      this.getProfessorId(),
      creneauId,
      auId
    );
  }
}
