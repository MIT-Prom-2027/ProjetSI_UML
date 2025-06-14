export class Inscription {
  private inscriptionId: number;
  public studentId: number;

  public auId: number;
  public mentionId: number;
  public niveauId: number;
  constructor(
    inscriptionId: number,
    auId: number,
    mentionId: number,
    studentId: number,
    niveauId: number
  ) {
    this.inscriptionId = inscriptionId;
    this.auId = auId;
    this.mentionId = mentionId;
    this.studentId = studentId;
    this.niveauId = niveauId;
  }

  public getInscriptionId(): number {
    return this.inscriptionId;
  }
  public setInscriptionId(inscriptionId: number) {
    this.inscriptionId = inscriptionId;
  }
}
