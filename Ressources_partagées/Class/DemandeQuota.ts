import { Administrateur } from "./Administrateur";
import { Demande } from "./Demande";
import { Utilisateur } from "./Utilisateur";
import { UtilisateurSite } from "./Utilisateur_site";

export class DemandeQuota extends Demande {

    constructor(private augmentationDemandeeGo: number, demandeur: UtilisateurSite, raison: string) {
        super(demandeur, raison)
        this.augmentationDemandeeGo = augmentationDemandeeGo
        this.setDateTraitement(new Date())
    } 

    setAugmentationDemandee = (augmentationDemandeeGo: number): void => {this.augmentationDemandeeGo = augmentationDemandeeGo}
    getAugmentationDemandee = (): number => this.augmentationDemandeeGo

    augmentationQuotaDemandee = (): boolean => {
        const compteSysteme: Utilisateur = this.demandeur.getCompteSysteme() 
        compteSysteme.setQuotaMaxGo(this.augmentationDemandeeGo)
        
        return true
    }
}
