export class AnneeUniversitaire {
  private auId: number;
  public startDate: Date;
  public endDate: Date;

  constructor(auId: number, startDate: Date, endDate: Date) {
    this.auId = auId;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getAuId(): number {
    return this.auId;
  }

  setAuId(auId: number) {
    this.auId = auId;
  }
}
