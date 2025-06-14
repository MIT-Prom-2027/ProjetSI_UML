export class Matiere {
  private matiereId: number;
  public mentionId: number;
  public ecueId: number;
  public parcoursId: number;

  constructor(
    matiereId: number,
    mentionId: number,
    ecueId: number,
    parcoursId: number
  ) {
    this.matiereId = matiereId;
    this.mentionId = mentionId;
    this.ecueId = ecueId;
    this.parcoursId = parcoursId;
  }

  public getmatiereId(): number {
    return this.matiereId;
  }
  public setmatiereId(matiereId: number) {
    this.matiereId = matiereId;
  }
}
