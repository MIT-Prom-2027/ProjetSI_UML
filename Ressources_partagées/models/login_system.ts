import { EspaceStockage, Notification, Personne, Serveur, TypeNotification, Utilisateur } from "@/models";

 export class LoginSystem {
    private idLoginSystem: number = -1  
    private valide: boolean = true
    
    constructor (
        private login: string, 
        private mot_de_passe: string,
        private espace_personnel: EspaceStockage
    ) {}

    //Setters 
    public setValide (valide: boolean): void {
        this.valide = valide
    }
    public setLogin (login: string): void {
        this.login = login
    }
    public setMotDePasse (mot_de_passe: string) {
        this.mot_de_passe = mot_de_passe
    }
    public setEspacePersonnel (espace_personnel: EspaceStockage): void {
        this.espace_personnel = espace_personnel
    }

    public setIdLoginSystem (idLoginSystem: number): void {
        this.idLoginSystem = idLoginSystem
    }

    // Getters
    public getIdLoginSystem = (): number => this.idLoginSystem
    public getValide = (): boolean => this.valide
    public getLogin = (): string => this.login
    public getMoDePasse = (): string => this.mot_de_passe
    public getEspacePersonnel = (): EspaceStockage => this.espace_personnel

    //Autres

        
    getPourcentageUtilisation(): number {
      return (this.espace_personnel.getEspaceUtilise() / this.espace_personnel.getQuota()) * 100
    }

    augmenterQuota(nouveauQuota: number): boolean {
      if (nouveauQuota > this.espace_personnel.getQuota()) {
        this.espace_personnel.setQuotaMaxGo(nouveauQuota)
        return true
      }
        return false
    }

    static async estQuotaDepasse(login_system: LoginSystem): Promise<boolean> {
        const est_depasse = login_system.espace_personnel.getEspaceUtilise() >= login_system.espace_personnel.getQuota() - 5*login_system.espace_personnel.getQuota()/100
        
        if (est_depasse) {
            const utilisateurs: Utilisateur[] = await Utilisateur.getTousUtilisateurs()
            if (!utilisateurs || utilisateurs.length === 0) {
                throw new Error("Aucun utilisateur trouvé.")
            }
            const index: number = utilisateurs.findIndex((u) => {
                u.getLoginSystem().getIdLoginSystem() === login_system.getIdLoginSystem() 
            })

            const id_personne: number = utilisateurs[index].getIdPersonne()
            const notification: Notification = new Notification("Quota restant moins de 5%", new Date(), false, TypeNotification.QUOTA)
            
           
            Serveur.notifier(utilisateurs[index], notification)
            
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
        console.log(`Quota dépassé: ${est_depasse}`);
        return est_depasse
    }

}



