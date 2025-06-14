import {Transaction} from "./Transaction"
import {Prevision} from "./Prevision"

export class Caisse {
    public solde: number;
    public transactions: Transaction[]
  
    constructor(solde: number) {
      this.solde = solde;
    }
  
    encaisser(prevision: Prevision, montant: number): void {
      if (montant<this.solde){
        if (montant<= prevision.montantRestant){
          const date = new Date();
          if (prevision.datePrevue>date){
            const t = new Transaction(
              this.transactions.length+1,
              montant,
              "recette",
              date,
              ""
            )
            this.transactions.push(t)
            prevision.montantRestant -= montant
            prevision.transaction.push(t)
            this.solde -= montant
          }
        }
      }
    }
  
    depenser(prevision: Prevision, montant: number): void {
      if (montant<this.solde){
        if (montant<= prevision.montantRestant){
          const date = new Date();
          if (prevision.datePrevue>date){
            const t = new Transaction(
              this.transactions.length+1,
              montant,
              "recette",
              date,
              ""
            )
            this.transactions.push(t)
            prevision.transaction.push(t)
            prevision.montantRestant -= montant
            this.solde -= montant
          }
        }
      }
    }
  
    afficherSolde(): number {
      return this.solde
    }
  }
  