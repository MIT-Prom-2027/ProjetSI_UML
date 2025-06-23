import { 
    DemandeInstallation, 
    DemandeQuota, 
    EspaceStockage, 
    Fichier, 
    Personne, 
    TypeNotification, 
    Utilisateur,
    Notification ,
    StatutDemande,
    Application
} from "@/models"

export class Serveur {
private adresseIp: string = ""
  constructor() {}
  public getAdresseIp = (): string => this.adresseIp;
  public setAdresseIp = (adresseIp: string): void => {
    this.adresseIp = adresseIp;
  };
  
  public authentifierCompte = (login: string, motDePasse: string): boolean => {
    // Logique d'authentification
    console.log(`Authentification de l'utilisateur avec login: ${login}`);
    // Pour l'exemple, on suppose que l'authentification réussit toujours
    return true;
  };


  public getQuotaUtilisateur(utilisateur: Utilisateur): {utilise: number, quota_max: number} {
    return utilisateur.consulterQuota();
  }

  public getQuotasGlobaux(): Map<Utilisateur, number[]> {
    // Placeholder for actual logic to retrieve all user quotas
    return new Map<Utilisateur, number[]>();
  }

  // Stockage en mémoire pour simulation de persistance
  private demandesQuotaEnregistrees: DemandeQuota[] = [];
  private demandesInstallationEnregistrees: DemandeInstallation[] = [];
  private applicationsInstallees: Application[] = [];

  public enregistrerDemandeQuota(demande: DemandeQuota): void {
    console.log(`📝 Enregistrement demande de quota...`);
    console.log(`   Demandeur: ${demande.getDemandeur().getNom()} ${demande.getDemandeur().getPrenom()}`);
    console.log(`   Augmentation: ${demande.getAugmentationDemandee()} GB`);
    console.log(`   Raison: ${demande.getRaison()}`);

    // Générer un ID unique pour la demande
    const nouvelId = this.demandesQuotaEnregistrees.length + 1;
    demande.setIdDemande(nouvelId);

    // Ajouter à la liste des demandes
    this.demandesQuotaEnregistrees.push(demande);

    // Notifier les administrateurs
    this.notifierAdministrateurs(
      `Nouvelle demande de quota de ${demande.getDemandeur().getNom()}`,
      TypeNotification.DEMANDE,
    );

    console.log(`✅ Demande de quota #${nouvelId} enregistrée avec succès`);
  }

  public enregistrerDemandeInstallation(demande: DemandeInstallation): void {
    console.log(`📝 Enregistrement demande d'installation...`);
    console.log(`   Demandeur: ${demande.getDemandeur().getNom()} ${demande.getDemandeur().getPrenom()}`);
    console.log(`   Application: ${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()}`);
    console.log(`   Raison: ${demande.getRaison()}`);

    // Générer un ID unique pour la demande
    const nouvelId = this.demandesInstallationEnregistrees.length + 1;
    demande.setIdDemande(nouvelId);

    // Ajouter à la liste des demandes
    this.demandesInstallationEnregistrees.push(demande);

    // Notifier les administrateurs
    this.notifierAdministrateurs(
      `Nouvelle demande d'installation: ${demande.getNomApplicationDemandee()}`,
      TypeNotification.DEMANDE,
    );

    console.log(`✅ Demande d'installation #${nouvelId} enregistrée avec succès`);
  }

  public traiterDemandeQuotaServeur(demande: DemandeQuota, approuve: boolean): void {
    console.log(`⚖️ Traitement demande de quota #${demande.getIdDemande()}...`);

    if (approuve) {
      console.log(`✅ Demande APPROUVÉE`);
      console.log(`   Augmentation de quota appliquée pour ${demande.getDemandeur().getNom()}`);

      // Notifier le demandeur
      const notification = new Notification(
        `Votre demande de quota de ${demande.getAugmentationDemandee()} GB a été approuvée`,
        new Date(),
        false,
        TypeNotification.QUOTA,
      );
      Serveur.notifier(demande.getDemandeur(), notification);
    } else {
      console.log(`❌ Demande REFUSÉE`);

      // Notifier le demandeur du refus
      const notification = new Notification(
        `Votre demande de quota a été refusée. Contactez l'administrateur pour plus d'informations.`,
        new Date(),
        false,
        TypeNotification.QUOTA
      );
      Serveur.notifier(demande.getDemandeur(), notification);
    }

    // Marquer la demande comme traitée
    demande.setDateTraitement(new Date());
    demande.setStatut(approuve ? StatutDemande.APPROUVEE : StatutDemande.REJETEE);

    // Retirer de la liste des demandes en attente
    this.demandesQuotaEnregistrees = this.demandesQuotaEnregistrees.filter((d) => d.getIdDemande() !== demande.getIdDemande());

    console.log(`📋 Demande de quota traitée et archivée`);
  }

  public traiterDemandeInstallationServeur(demande: DemandeInstallation, approuve: boolean): void {
    console.log(`⚖️ Traitement demande d'installation #${demande.getIdDemande()}...`);

    if (approuve) {
      console.log(`✅ Demande APPROUVÉE - Installation en cours...`);

      // Créer l'application à installer
      const nouvelleApp = new Application(
        this.applicationsInstallees.length + 1,
        demande.getNomApplicationDemandee(),
        demande.getVersionDemandee(),
        "", // cheminInstallation (will be set by installer)
        new Date() // dateInstallation (will be set by installer)
      );

      if (true) {
        // Notifier le demandeur du succès
        const notification = new Notification(
          `${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()} a été installé avec succès`,
          new Date(),
          false,
          TypeNotification.SYSTEME,
        );

        Serveur.notifier(demande.getDemandeur(), notification);

        // Notifier tous les utilisateurs de la nouvelle application
        this.notifierTousUtilisateurs(
          `Nouvelle application disponible: ${demande.getNomApplicationDemandee()} v${demande.getVersionDemandee()}`,
          TypeNotification.SYSTEME,
        );
      }
    } else {
      console.log(`❌ Demande REFUSÉE`);

      // Notifier le demandeur du refus
      const notification = new Notification(
        `Votre demande d'installation de ${demande.getNomApplicationDemandee()} a été refusée`,
        new Date(),
        false,
        TypeNotification.SYSTEME
      );
      Serveur.notifier(demande.getDemandeur(), notification);
    }

    // Marquer la demande comme traitée
    demande.setDateTraitement(new Date());
    demande.setStatut(approuve ? StatutDemande.APPROUVEE : StatutDemande.REJETEE);

    // Retirer de la liste des demandes en attente
    this.demandesInstallationEnregistrees = this.demandesInstallationEnregistrees.filter((d) => d.getIdDemande() !== demande.getIdDemande());

    console.log(`📋 Demande d'installation traitée et archivée`);
  }

  public installerApplicationServeur(app: Application): boolean {
    console.log(`🔧 Installation de ${app.getNomApplication()} v${app.getVersion()}...`);

    try {
      // Définir le chemin d'installation
      const cheminInstallation = `/opt/${app.getNomApplication().toLowerCase().replace(/\s+/g, "-")}`;
      app.setCheminInstallation(cheminInstallation);

      // Simulation des étapes d'installation
      console.log(`   📁 Création du répertoire: ${cheminInstallation}`);
      console.log(`   📦 Téléchargement des packages...`);
      console.log(`   ⚙️ Configuration de l'application...`);
      console.log(`   🔗 Création des liens symboliques...`);
      console.log(`   🔐 Configuration des permissions...`);

      // Ajouter à la liste des applications installées
      this.applicationsInstallees.push(app);

      console.log(`✅ ${app.getNomApplication()} installé avec succès dans ${cheminInstallation}`);
      return true;
    } catch (error) {
      console.error(`❌ Erreur lors de l'installation de ${app.getNomApplication()}:`, error);
      return false;
    }
  }

  public desinstallerApplicationServeur(app: Application): boolean {
    console.log(`🗑️ Désinstallation de ${app.getNomApplication()} v${app.getVersion()}...`);

    try {
      // Vérifier si l'application est installée
      const appIndex = this.applicationsInstallees.findIndex((a) => a.getIdApplication() === app.getIdApplication());

      if (appIndex === -1) {
        console.log(`⚠️ Application non trouvée dans la liste des applications installées`);
        return false;
      }

      // Simulation des étapes de désinstallation
      console.log(`   🛑 Arrêt des services liés à ${app.getNomApplication()}...`);
      console.log(`   🗂️ Suppression des fichiers dans ${app.getCheminInstallation()}...`);
      console.log(`   🔗 Suppression des liens symboliques...`);
      console.log(`   🧹 Nettoyage des fichiers de configuration...`);
      console.log(`   📝 Mise à jour du registre des applications...`);

      // Retirer de la liste des applications installées
      this.applicationsInstallees.splice(appIndex, 1);

      // Notifier tous les utilisateurs
      this.notifierTousUtilisateurs(
        `L'application ${app.getNomApplication()} a été désinstallée du serveur`,
        TypeNotification.SYSTEME,
      );

      console.log(`✅ ${app.getNomApplication()} désinstallé avec succès`);
      return true;
    } catch (error) {
      console.error(`❌ Erreur lors de la désinstallation de ${app.getNomApplication()}:`, error);
      return false;
    }
  }

  // Méthodes utilitaires pour les notifications
  private notifierAdministrateurs(message: string, type: TypeNotification): void {
    // Import des administrateurs (simulation)
    // const { administrateursWebFictifs } = require("./data/mock-data"); // Removed mock data import
    // For now, assume a global list of administrators or pass them as a parameter
    console.log(`Notifying administrators: ${message}`);
  }

  private notifierTousUtilisateurs(message: string, type: TypeNotification): void {
    // Import des utilisateurs (simulation)
    // const { administrateursWebFictifs, utilisateursWebFictifs } = require("./data/mock-data"); // Removed mock data import
    // const tousUtilisateurs = [...administrateursWebFictifs, ...utilisateursWebFictifs];
    // For now, assume a global list of users or pass them as a parameter
    console.log(`Notifying all users: ${message}`);
  }

  // Getters pour accéder aux données stockées
  public getDemandesQuotaEnAttente(): DemandeQuota[] {
    return [...this.demandesQuotaEnregistrees];
  }

  public getDemandesInstallationEnAttente(): DemandeInstallation[] {
    return [...this.demandesInstallationEnregistrees];
  }

  public getApplicationsInstallees(): Application[] {
    return [...this.applicationsInstallees];
  }

  public gererFichier(espace: EspaceStockage, action: string, fichier: Fichier): boolean {
    switch (action.toLowerCase()) {
      case "upload":
        espace.ajouterFichier(fichier);
        return true;
      case "delete":
        espace.supprimerFichier(fichier.getNomFichier()); // Assuming supprimerFichier takes nomFichier
        return true;
      default:
        console.log(`Action non reconnue: ${action}`);
        return false;
    }
  }

  static notifier(destinataire: Personne, notification: Notification): void {
    console.log(`Notification envoyée à ${destinataire.getNom()}: ${notification.getMessage()}`);
    destinataire.recevoirNotification(notification);
  }
}


