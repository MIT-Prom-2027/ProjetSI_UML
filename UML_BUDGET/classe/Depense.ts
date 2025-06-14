import { Prevision } from "./Prevision";

export class Depense extends Prevision {
    constructor(
      public categorie: string,
      public beneficiaire: string, 
      id:string,montant:number,
      datePrevue: Date, 
      dateEnregistrement: Date, 
      statut: string
    ) {
      super();
      this.categorie = categorie;
      this.beneficiaire = beneficiaire;
    }
  
    valider(): void {
      this.statut = "valide"
    }
  }
  