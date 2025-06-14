import { Transaction } from "./Transaction"

export class Prevision {
  public id: string
  public montant: number
  public datePrevue: Date
  public dateEnregistrement: Date
  public statut: string
  public montantRestant: number
  public transaction: Transaction[]
  constructor() {}

  creer(montant, date): void {
    this.montant = montant
    this.datePrevue = date
    this.dateEnregistrement = new Date()
    this.statut = "non valide"
    this.montantRestant = this.montant
  }

  modifier(montant): void {
    
  }

  annuler(): void {
    
  }
}
  