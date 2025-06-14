import { Prevision } from "./Prevision";

export class Recette extends Prevision {
    constructor(
      public source:string, 
      id:string,
      montant:number,
      datePrevue: Date, 
      dateEnregistrement: Date, 
      statut: string
    ) {
      super()
      this.source = source;
    }
  
    valider(): void {
      this.statut = "valide"
    }

  }
  