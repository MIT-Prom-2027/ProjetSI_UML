import { DemandeInstallation } from "./DemandeInstallation";
import { DemandeQuota } from "./DemandeQuota";
import { Utilisateur } from "./Utilisateur";
import { UtilisateurSite } from "./Utilisateur_site";

export enum PermissionType {
    LIRE = "r",
    ECRIRE = "w",
    EXECUTER = "x"
}

export class Administrateur extends UtilisateurSite{
    
    consulterQuotaGlobaux(): {utilisateurs: Utilisateur[], quota: number[]} {
        const utilisateurs: Utilisateur[] = Utilisateur.getTousUtilisateurs();
        const quota: number[] = utilisateurs.map((u: Utilisateur)=>{
            return u.getEspaceUtiliseGo();
        })
        return {utilisateurs: utilisateurs, quota: quota}
    }
    
    traiterDemandeQuota = (demande: DemandeQuota, approuve: boolean): boolean => {
        if(approuve) {
            demande.augmentationQuotaDemandee()
        }
        return false
    }

    traiterDemandeInstallation = (demande: DemandeInstallation, approuve: boolean): boolean => {
        return approuve ? true : false
    }   
    
    supprimerCompte(compte: Utilisateur): boolean {
        const comptes: Utilisateur[] = Utilisateur.getTousUtilisateurs()
        const index: number = comptes.findIndex((c: Utilisateur) => {
            c.getNomUtilisateur() === compte.getNomUtilisateur() && c.getMotDePasseHash() === compte.getMotDePasseHash()
        })

        if (index !== -1) {
            comptes.splice(index, 1);
            return true
        }  
        return false
    }

    gererPermissionEspaceStockage = (compte: Utilisateur, permission: PermissionType[], accorder: boolean): void => {
        
    } 
}
