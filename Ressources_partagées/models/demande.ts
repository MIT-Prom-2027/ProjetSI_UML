import { Utilisateur, StatutDemande } from "@/models";

export abstract class Demande {
  protected idDemande: number;
  protected dateDemande: Date;
  protected dateTraitement: Date;
  protected statut: StatutDemande;
  protected raison: string;
  protected demandeur: Utilisateur; // Association, not an attribute in UML, but needed for context

  constructor(idDemande: number, dateDemande: Date, dateTraitement: Date, statut: StatutDemande, raison: string, demandeur: Utilisateur) {
    this.idDemande = idDemande;
    this.dateDemande = dateDemande;
    this.dateTraitement = dateTraitement;
    this.statut = statut;
    this.raison = raison;
    this.demandeur = demandeur;
  }

  public getStatut(): StatutDemande {
    return this.statut;
  }

  public setStatut(statut: StatutDemande): void {
    this.statut = statut;
  }

  // Getters and Setters for other attributes
  public getIdDemande(): number {
    return this.idDemande;
  }

  public setIdDemande(idDemande: number): void {
    this.idDemande = idDemande;
  }

  public getDateDemande(): Date {
    return this.dateDemande;
  }

  public setDateDemande(dateDemande: Date): void {
    this.dateDemande = dateDemande;
  }

  public getDateTraitement(): Date {
    return this.dateTraitement;
  }

  public setDateTraitement(dateTraitement: Date): void {
    this.dateTraitement = dateTraitement;
  }

  public getRaison(): string {
    return this.raison;
  }

  public setRaison(raison: string): void {
    this.raison = raison;
  }

  public getDemandeur(): Utilisateur {
    return this.demandeur;
  }

  public setDemandeur(demandeur: Utilisateur): void {
    this.demandeur = demandeur;
  }
}


