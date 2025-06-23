import { EspaceStockage, LoginSystem, Personne, typeEspaceStockage } from "@/models"

export class Utilisateur extends Personne {
  
  constructor(idPersonne: number, nom: string, prenom: string, email: string, private login_system: LoginSystem) {
    super(idPersonne, nom, prenom, email)
  }

  setLoginSystem (login_system: LoginSystem): void {
    this.login_system = login_system
  }
  
  getLoginSystem = (): LoginSystem => this.login_system 
  consulterQuota(): { utilise: number; quota_max: number } {
    return {
      utilise: this.login_system.getEspacePersonnel().getTailleUtiliseeGo(),
      quota_max: this.login_system.getEspacePersonnel().getQuota(),
    }
  }
  
  demanderAugmentationQuota(nouveauQuota: number): void {
    if (nouveauQuota > this.login_system.getEspacePersonnel().getQuota()) {
      this.login_system.getEspacePersonnel().setQuotaMaxGo(nouveauQuota)
      console.log(`Quota augmenté à ${nouveauQuota} octets pour le client ${this.getNom()}.`)
    } else {
      console.log("Le nouveau quota doit être supérieur au quota actuel.")
    }
  }

  demanderInstallationApplication(nomApplication: string, versionDemandee: string): void {
    console.log(`Demande d'installation de l'application ${nomApplication} version ${versionDemandee} pour le client ${this.getNom()}.`)
  }

  accederEspaceCommun(): void {
    console.log(`Accès à l'espace commun pour le client ${this.getNom()}.`)
  }

  partagerFichier(fichier: string): void {
    console.log(`Partage du fichier ${fichier} par le client ${this.getNom()}.`)
  }

  static async getTousUtilisateurs(): Promise<Utilisateur[]> {
    try{
        const response = await fetch("/api/user",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(!response) {
            throw new Error("Erreur lors de la récupération des données.")
        }

        const result = await response.json()
        if ( !result || !result.data) 
          throw new Error("Erreur lors de la récupération des données.")

        const utilisateurs: Utilisateur[] = result.data()
        return utilisateurs
    } catch (error) {
      throw new Error("Erreur lors de l'accès à l'api.")
    }
  }
}
