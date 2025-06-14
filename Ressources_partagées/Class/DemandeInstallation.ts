import { Demande } from "./Demande";
import { UtilisateurSite } from "./Utilisateur_site";

export class DemandeInstallation extends Demande {

    constructor (demandeur: UtilisateurSite, raison: string, private nomApplicationDemandee: string, private versionDemandee: string) {
        super(demandeur, raison)
    }
    setNomApplicationDemandee = (nomApplicationDemandee: string): void => {this.nomApplicationDemandee = nomApplicationDemandee}
    setVersionApplicationDemandee = (versionDemandee: string): void => {this.versionDemandee = versionDemandee}
    getNomApplicationDemandee = (): string => this.nomApplicationDemandee
    getVersionDemandee = (): string => this.versionDemandee

}
