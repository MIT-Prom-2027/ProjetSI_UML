import { Demande, StatutDemande, Utilisateur } from "@/models"

export class DemandeInstallation extends Demande {
  private nomApplicationDemandee: string;
  private versionDemandee: string;
  private priorite: number;

  constructor(
    idDemande: number, 
    dateDemande: Date, 
    dateTraitement: Date, 
    statut: StatutDemande, 
    raison: string, 
    nomApplicationDemandee: string, 
    versionDemandee: string, 
    priorite: number, 
    demandeur: Utilisateur
  ) {
    super(idDemande, dateDemande, dateTraitement, statut, raison, demandeur);
    this.nomApplicationDemandee = nomApplicationDemandee;
    this.versionDemandee = versionDemandee;
    this.priorite = priorite;
  }

  public getNomApplicationDemandee(): string {
    return this.nomApplicationDemandee;
  }

  public getVersionDemandee(): string {
    return this.versionDemandee;
  }

  public getPriorite(): number {
    return this.priorite;
  }

  public setNomApplicationDemandee(nomApplicationDemandee: string): void {
    this.nomApplicationDemandee = nomApplicationDemandee;
  }

  public setVersionDemandee(versionDemandee: string): void {
    this.versionDemandee = versionDemandee;
  }

  public setPriorite(priorite: number): void {
    this.priorite = priorite;
  }
}


