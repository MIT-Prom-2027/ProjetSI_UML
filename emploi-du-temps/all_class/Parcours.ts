export class Parcours {
  private parcoursId: number;
  public name: string;

  constructor(parcoursId: number, name: string) {
    this.parcoursId = parcoursId;
    this.name = name;
  }

  public getParcoursId(): number {
    return this.parcoursId;
  }
  public setParcoursId(parcoursId: number) {
    this.parcoursId = parcoursId;
  }
}
