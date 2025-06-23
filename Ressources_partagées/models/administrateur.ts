import { 
    Personne, 
    Utilisateur, 
    Application, 
    DemandeQuota,
    DemandeInstallation,
    EspaceStockage,
    StatutDemande,
    PermissionType,
    TypeNotification,
    Notification,
    Serveur
} from "@/models";

export class Administrateur extends Personne {
  private privileges: string[];

  constructor(idPersonne: number, nom: string, prenom: string, email: string, privileges: string[]) {
    super(idPersonne, nom, prenom, email);
    this.privileges = privileges;
  }

  public consulterQuotasGlobaux(): Map<Utilisateur, number[]> {
    console.log("Consultation des quotas globaux...");
    // Placeholder for actual logic to retrieve all user quotas
    return new Map<Utilisateur, number[]>();
  }

  public traiterDemandeQuota(demande: DemandeQuota, approuve: boolean): void {
    console.log(`Traitement de la demande de quota ${demande.getIdDemande()} - Approuvée: ${approuve}`);
    demande.setStatut(approuve ? StatutDemande.APPROUVEE : StatutDemande.REJETEE);
    // Additional logic for quota update if approved
  }

  public traiterDemandeInstallation(demande: DemandeInstallation, approuve: boolean): void {
    console.log(`Traitement de la demande d'installation ${demande.getIdDemande()} - Approuvée: ${approuve}`);
    demande.setStatut(approuve ? StatutDemande.APPROUVEE : StatutDemande.REJETEE);
  }

  public async supprimerCompte(utilisateur: Utilisateur): Promise<boolean> {
    try{
      const response = await fetch("/api/admin",
      {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              action: "supprimer_compte",
              utilisateur_id: utilisateur.getIdPersonne()
          }),
      })

      if(!response) {
          throw new Error("Erreur lors de la récupération des données.")
      }

      const result = await response.json()
      if ( !result || !result.is_delete) 
        throw new Error("Erreur lors de la récupération des données.")
     
      if (result.is_delete) {
        const message: string = `Compte de ${utilisateur.getNom()} supprimé`
        const send_date: Date = new Date() 
        const is_read: boolean = false  
        const type: TypeNotification = TypeNotification.SYSTEME
        const person_id: number = this.getIdPersonne()
        
        const notification = new Notification(
          message,           
          send_date,
          is_read,
          type,
          // person_id
        )
        // const personnes: Personne[] = Personne.getTousPersonnes()
        // const index = personnes.findIndex((p)=> p.getIdPersonne()=== this.idPersonne)
        // if (index !== -1 ) 
        //   Serveur.notifier(personnes[index], notification)
        // else 
        //   throw new Error("La personne à notifier n'existe pas!")

        Serveur.notifier(this, notification)
        try {
          const response = await fetch("/api/notification", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  notification: notification
              }),
          });

          if (!response.ok) {
              throw new Error("Erreur lors de l'envoi de la notification.");
          }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la notification:", error);
        }
      }

      return result.is_delete;

    } catch (error) {
      throw new Error("Erreur lors de l'accès à l'api.")
    }
  }

  public definirQuota(utilisateur: Utilisateur, quotaGo: number): boolean {
    console.log(`Définition du quota de ${utilisateur.getNom()} à ${quotaGo} Go`);
    utilisateur.getLoginSystem().getEspacePersonnel().setQuotaMaxGo(quotaGo);
    return true;
  }

  public gererPermissionsEspaceStockage(espace: EspaceStockage, utilisateur: Utilisateur, permission: PermissionType, accorder: boolean): void {
    console.log(`Gestion des permissions pour ${utilisateur.getNom()} sur ${espace.getCheminAcces()}: ${permission} - ${accorder ? 'accorder' : 'révoquer'}`);
    espace.setPermission(utilisateur, permission, accorder);
  }

  // Getters and Setters
  public getPrivileges(): string[] {
    return this.privileges;
  }

  public setPrivileges(privileges: string[]): void {
    this.privileges = privileges;
  }
}


