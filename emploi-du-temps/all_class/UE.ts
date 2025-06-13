import { Ecue } from "./Ecue";

export class UE {
  private ueId: number;
  public ecue?: Ecue[];

  constructor(ueId: number, ecue: Ecue[]) {
    this.ueId = ueId;
    this.ecue = ecue;
  }

  public getUeId(): number {
    return this.ueId;
  }

  public setUeId(ueId: number) {
    this.ueId = ueId;
  }
}
