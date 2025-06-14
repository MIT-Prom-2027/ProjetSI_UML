import type { UtilisateurSite } from "./Utilisateur_site"
import type { Fichier } from "./Fichier"
import type { DemandeInstallation } from "./DemandeInstallation"
import type { DemandeQuota } from "./DemandeQuota"
import type { EspaceStockage } from "./Espace_stockage"
import { Utilisateur } from "./Utilisateur"
import { Notification } from "./Notification"
import { TypeNotification } from "./TypeNotification"
import { Application as App } from "./Application" // Corrected import

export class Serveur {
  constructor(private adresseIp: string) {}
  public getAdresseIp = (): string => this.adresseIp
  public setAdresseIp = (adresseIp: string): void => {
    this.adresseIp = adresseIp
  }
  public authentifierCompte = (login: string, motDePasse: string): boolean => {
    // Logique d'authentification
    console.log(`Authentification de l'utilisateur avec login: ${login}`)
    // Pour l'exemple, on suppose que l'authentification réussit toujours
    return true
  }

  getQuotaUtilisateur(compte: Utilisateur): number {
    return compte.getEspaceUtiliseGo()
  }

  getQuotaGlobaux(): { utilisateur: Utilisateur[]; quota: number[] } {
    const utilisateurs = Utilisateur.getTousUtilisateurs()
    const quotas = utilisateurs.map((u) => u.getEspaceUtiliseGo())
    return { utilisateur: utilisateurs, quota: quotas }
  }

  // Stockage en mémoire pour simulation de persistance
  private demandesQuotaEnregistrees: DemandeQuota[] = []
  private demandesInstallationEnregistrees: DemandeInstallation[] = []
  private applicationsInstallees: App[] = [] // Corrected type

  enregistrerDemandeQuota(demande: DemandeQuota): void {
    console.log(`📝 Enregistrement demande de quota...`)
    console.log(`   Demandeur: ${demande.getDemandeur().getNom()} ${demande.getDemandeur().getPrenom()}`)
    console.log(`   Augmentation: ${(demande.getAugmentationDemandee() / 1000000).toFixed(2)} GB`)
    console.log(`   Raison: ${demande.getRaison()}`)

    // Générer un ID unique pour la demande
    const nouvelId = this.demandesQuotaEnregistrees.length + 1
    demande.setIdDemande(nouvelId)

    // Ajouter à la liste des demandes
    this.demandesQuotaEnregistrees.push(demande)

    // Notifier les administrateurs
    this.notifierAdministrateurs(
      `Nouvelle demande de quota de ${demande.getDemandeur().getNom()}`,
      TypeNotification.INFO,
    )

    console.log(`✅ Demande de quota #${nouvelId} enregistrée avec succès`)
  }

  enregistrerDemandeInstallation(demande: DemandeInstallation): void {
    console.log(`📝 Enregistrement demande d'installation...`)
    console.log(`   Demandeur: ${demande.getDemandeur().getNom()} ${demande.getDemandeur().getPrenom()}`)
    console.log(`   Application: ${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()}`)
    console.log(`   Raison: ${demande.getRaison()}`)

    // Générer un ID unique pour la demande
    const nouvelId = this.demandesInstallationEnregistrees.length + 1
    demande.setIdDemande(nouvelId)

    // Ajouter à la liste des demandes
    this.demandesInstallationEnregistrees.push(demande)

    // Notifier les administrateurs
    this.notifierAdministrateurs(
      `Nouvelle demande d'installation: ${demande.getNomApplicationDemandee()}`,
      TypeNotification.INFO,
    )

    console.log(`✅ Demande d'installation #${nouvelId} enregistrée avec succès`)
  }

  traiterDemandeQuotaServeur(demande: DemandeQuota, approuve: boolean): void {
    console.log(`⚖️ Traitement demande de quota #${demande.getIdemande()}...`)

    if (approuve) {
      console.log(`✅ Demande APPROUVÉE`)

      // Appliquer l'augmentation de quota
      const success = demande.augmentationQuotaDemandee()

      if (success) {
        const compteSysteme = demande.getDemandeur().getCompteSysteme()
        console.log(
          `   Nouveau quota pour ${compteSysteme.getNomUtilisateur()}: ${(
            compteSysteme.getQuotaMaxGo() / 1000000
          ).toFixed(2)} GB`,
        )

        // Notifier le demandeur
        const notification = new Notification(
          demande.getDemandeur().getIPersonne(),
          `Votre demande de quota de ${(demande.getAugmentationDemandee() / 1000000).toFixed(2)} GB a été approuvée`,
        )
        notification.setType(TypeNotification.SUCCES)
        this.notifier(demande.getDemandeur(), notification)
      }
    } else {
      console.log(`❌ Demande REFUSÉE`)

      // Notifier le demandeur du refus
      const notification = new Notification(
        demande.getDemandeur().getIPersonne(),
        `Votre demande de quota a été refusée. Contactez l'administrateur pour plus d'informations.`,
      )
      notification.setType(TypeNotification.ERREUR)
      this.notifier(demande.getDemandeur(), notification)
    }

    // Marquer la demande comme traitée
    demande.setDateTraitement(new Date())

    // Retirer de la liste des demandes en attente
    this.demandesQuotaEnregistrees = this.demandesQuotaEnregistrees.filter((d) => d !== demande)

    console.log(`📋 Demande de quota traitée et archivée`)
  }

  traiterDemandeInstallationServeur(demande: DemandeInstallation, approuve: boolean): void {
    console.log(`⚖️ Traitement demande d'installation #${demande.getIdemande()}...`)

    if (approuve) {
      console.log(`✅ Demande APPROUVÉE - Installation en cours...`)

      // Créer l'application à installer
      const nouvelleApp = new App(
        this.applicationsInstallees.length + 1,
        demande.getNomApplicationDemandee(),
        demande.getVersionDemandee(),
      )

      // Installer l'application
      const installationReussie = this.installerApplicationServeur(nouvelleApp)

      if (installationReussie) {
        // Notifier le demandeur du succès
        const notification = new Notification(
          demande.getDemandeur().getIPersonne(),
          `${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()} a été installé avec succès`,
        )
        notification.setType(TypeNotification.SUCCES)
        this.notifier(demande.getDemandeur(), notification)

        // Notifier tous les utilisateurs de la nouvelle application
        this.notifierTousUtilisateurs(
          `Nouvelle application disponible: ${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()}`,
          TypeNotification.INFO,
        )
      }
    } else {
      console.log(`❌ Demande REFUSÉE`)

      // Notifier le demandeur du refus
      const notification = new Notification(
        demande.getDemandeur().getIPersonne(),
        `Votre demande d'installation de ${demande.getNomApplicationDemandee()} a été refusée`,
      )
      notification.setType(TypeNotification.ERREUR)
      this.notifier(demande.getDemandeur(), notification)
    }

    // Marquer la demande comme traitée
    demande.setDateTraitement(new Date())

    // Retirer de la liste des demandes en attente
    this.demandesInstallationEnregistrees = this.demandesInstallationEnregistrees.filter((d) => d !== demande)

    console.log(`📋 Demande d'installation traitée et archivée`)
  }

  installerApplicationServeur(app: App): boolean {
    console.log(`🔧 Installation de ${app.getNomApplication()} v${app.getVersion()}...`)

    try {
      // Définir le chemin d'installation
      const cheminInstallation = `/opt/${app.getNomApplication().toLowerCase().replace(/\s+/g, "-")}`
      app.setCheminInstallation(cheminInstallation)

      // Simulation des étapes d'installation
      console.log(`   📁 Création du répertoire: ${cheminInstallation}`)
      console.log(`   📦 Téléchargement des packages...`)
      console.log(`   ⚙️ Configuration de l'application...`)
      console.log(`   🔗 Création des liens symboliques...`)
      console.log(`   🔐 Configuration des permissions...`)

      // Ajouter à la liste des applications installées
      this.applicationsInstallees.push(app)

      console.log(`✅ ${app.getNomApplication()} installé avec succès dans ${cheminInstallation}`)
      return true
    } catch (error) {
      console.error(`❌ Erreur lors de l'installation de ${app.getNomApplication()}:`, error)
      return false
    }
  }

  desinstallerApplicationServeur(app: App): boolean {
    console.log(`🗑️ Désinstallation de ${app.getNomApplication()} v${app.getVersion()}...`)

    try {
      // Vérifier si l'application est installée
      const appIndex = this.applicationsInstallees.findIndex((a) => a.getIdApplication() === app.getIdApplication())

      if (appIndex === -1) {
        console.log(`⚠️ Application non trouvée dans la liste des applications installées`)
        return false
      }

      // Simulation des étapes de désinstallation
      console.log(`   🛑 Arrêt des services liés à ${app.getNomApplication()}...`)
      console.log(`   🗂️ Suppression des fichiers dans ${app.getCheminInstallation()}...`)
      console.log(`   🔗 Suppression des liens symboliques...`)
      console.log(`   🧹 Nettoyage des fichiers de configuration...`)
      console.log(`   📝 Mise à jour du registre des applications...`)

      // Retirer de la liste des applications installées
      this.applicationsInstallees.splice(appIndex, 1)

      // Notifier tous les utilisateurs
      this.notifierTousUtilisateurs(
        `L'application ${app.getNomApplication()} a été désinstallée du serveur`,
        TypeNotification.AVERTISSEMENT,
      )

      console.log(`✅ ${app.getNomApplication()} désinstallé avec succès`)
      return true
    } catch (error) {
      console.error(`❌ Erreur lors de la désinstallation de ${app.getNomApplication()}:`, error)
      return false
    }
  }

  // Méthodes utilitaires pour les notifications
  private notifierAdministrateurs(message: string, type: TypeNotification): void {
    // Import des administrateurs (simulation)
    const { administrateursWebFictifs } = require("./data/mock-data")

    administrateursWebFictifs.forEach((admin: any) => {
      const notification = new Notification(admin.getIPersonne(), message)
      notification.setType(type)
      this.notifier(admin, notification)
    })
  }

  private notifierTousUtilisateurs(message: string, type: TypeNotification): void {
    // Import des utilisateurs (simulation)
    const { administrateursWebFictifs, utilisateursWebFictifs } = require("./data/mock-data")

    const tousUtilisateurs = [...administrateursWebFictifs, ...utilisateursWebFictifs]

    tousUtilisateurs.forEach((user: any) => {
      const notification = new Notification(user.getIPersonne(), message)
      notification.setType(type)
      this.notifier(user, notification)
    })
  }

  // Getters pour accéder aux données stockées
  public getDemandesQuotaEnAttente(): DemandeQuota[] {
    return [...this.demandesQuotaEnregistrees]
  }

  public getDemandesInstallationEnAttente(): DemandeInstallation[] {
    return [...this.demandesInstallationEnregistrees]
  }

  public getApplicationsInstallees(): App[] {
    return [...this.applicationsInstallees]
  }

  gererFichierEspace(espace: EspaceStockage, action: string, fichier: Fichier): boolean {
    switch (action.toLowerCase()) {
      case "upload":
        espace.ajouterFichier(fichier)
        return true
      case "delete":
        espace.supprimerFichier(fichier)
        return true
      default:
        console.log(`Action non reconnue: ${action}`)
        return false
    }
  }

  notifier(destinataire: UtilisateurSite, notification: Notification): void {
    console.log(`Notification envoyée à ${destinataire.getNom()}: ${notification.getMessage()}`)
    destinataire.recevoirNotification(notification)
  }
}
