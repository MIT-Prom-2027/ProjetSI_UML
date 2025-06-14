import { Administrateur } from "./Administrateur";
import { UtilisateurSite } from "./Utilisateur_site";

export abstract class Demande {
    private idDemande: number = -1
    private dateDemande: Date = new Date()
    private dateTraitement!: Date
    private approbateur!: Administrateur

    constructor(protected demandeur: UtilisateurSite,  private raison: string) {
        this.demandeur = demandeur;
        // this.approbateur = approbateur;
        this.raison = raison;
    }  

    public setDateTraitement = (dateTraitement: Date): void => {this.dateTraitement = dateTraitement} 
    public setApprobateur = (approbateur: Administrateur): void => {this.approbateur = approbateur}
    public setDemandeur = (demandeur: UtilisateurSite): void => {this.demandeur = demandeur}
    public setDateDemande = (dateDemande: Date): void => {this.dateDemande = dateDemande} 
    public setIdDemande = (idDemande: number): void => {this.idDemande = idDemande}
    public setRaison = (raison: string): void => {this.raison = raison}

    public getApprobateur = (): Administrateur => this.approbateur
    public getDemandeur = (): UtilisateurSite => this.demandeur
    public getDateTraitement = (): Date => this.dateTraitement
    public getDateDemande    = (): Date => this.dateDemande
    public getIdemande = (): number => this.idDemande
    public getRaison = (): string => this.raison
}
