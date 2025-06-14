import { Personne } from "./Personne"
import { Utilisateur } from "./Utilisateur"

export abstract class UtilisateurSite extends Personne {
  protected compteSysteme: Utilisateur

  constructor(nom: string, prenom: string, email: string) {
    super(nom, prenom, email)
    this.compteSysteme = new Utilisateur(nom)
  }

  consulterQuota = (): { utilisateur: Utilisateur; quota: number } => {
    return { utilisateur: this.compteSysteme, quota: this.compteSysteme.getEspaceUtiliseGo() }
  }

  recevoirNotification(notification: Notification): void {
    console.log(`📧 Notification reçue par ${this.getNom()} ${this.getPrenom()}`)
    console.log(`   Type: ${notification.getType()}`)
    console.log(`   Message: ${notification.getMessage()}`)
    console.log(`   Date: ${notification.getDateEnvoi().toLocaleString()}`)

    // Marquer comme non lue par défaut
    notification.setEstLue(false)

    // Simulation d'envoi par email
    this.envoyerEmailNotification(notification)

    // Stockage local de la notification pour l'utilisateur
    this.ajouterNotificationPersonnelle(notification)
  }

  private envoyerEmailNotification(notification: Notification): void {
    console.log(`📨 Email envoyé à ${this.getEmail()}`)
    console.log(`   Sujet: [${notification.getType()}] Notification système`)
    console.log(`   Corps: ${notification.getMessage()}`)
  }

  private ajouterNotificationPersonnelle(notification: Notification): void {
    // Simulation d'ajout à une liste personnelle de notifications
    console.log(`💾 Notification ajoutée à la liste personnelle de ${this.getNom()}`)
  }

  getCompteSysteme = (): Utilisateur => this.compteSysteme
}
