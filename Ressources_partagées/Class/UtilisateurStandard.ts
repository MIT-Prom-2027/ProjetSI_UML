import { UtilisateurSite } from "./Utilisateur_site"

export class UtilisateurStandard extends UtilisateurSite {
  constructor(nom: string, prenom: string, email: string) {
    super(nom, prenom, email)
  }

  // Méthodes spécifiques aux utilisateurs standards
  public demanderQuota(augmentationGo: number, raison: string): void {
    console.log(`Demande de quota de ${augmentationGo}GB pour ${this.getNom()}: ${raison}`)
  }

  public demanderInstallation(nomApp: string, version: string, raison: string): void {
    console.log(`Demande d'installation de ${nomApp} v${version} pour ${this.getNom()}: ${raison}`)
  }

  public consulterEspaceDisponible(): number {
    return this.compteSysteme.getEspaceRestant()
  }

  // Implémentation de la méthode abstraite
  public recevoirNotification(notification: Notification): void {
    console.log(`Notification reçue par ${this.getNom()}: ${notification.getMessage()}`)
  }
}
