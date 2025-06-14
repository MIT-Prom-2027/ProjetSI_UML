export class Transaction {
    constructor(
      public id: number,
      public montant: number,
      public type: string,
      public date: Date,
      public beneficiaireSource: string
    ) {}
  
    enregistrer(): void {
      
    }
  }
  