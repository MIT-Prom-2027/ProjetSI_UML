import { StatutSession } from "./StatutSession";

export class SessionSys {
  constructor() {
    
  }

  public setStatut(s: StatutSession): void {  
    console.log("Statut session sys mis à jour :", s);
  }
}