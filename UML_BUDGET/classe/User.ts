import {Notification} from "./Notification"
import {Rapport} from "./Rapport"

export class User {
  public id: number
  public nom: string
  public role: string
  public login: string
  public motDePasse: string
  public notifications: Notification[]
  public rapports: Rapport[]
  constructor() {}

  seConnecter(): void {
    
  }

  consulterProfil(): void {
    
  }

  afficherNotification(): Notification[] {
    return this.notifications
  }

  afficherRapport(): Rapport[] {
    return this.rapports
  }

  afficherProposition(): void {
  }
}
  