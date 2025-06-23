import { Demande, StatutDemande, Utilisateur } from "@/models"
export class DemandeQuota extends Demande {
  private augmentationDemandeeGo: number;
  private quotaActuel: number;

  constructor(
    idDemande: number, 
    dateDemande: Date, 
    dateTraitement: Date, 
    statut: StatutDemande, 
    raison: string, 
    augmentationDemandeeGo: number, 
    quotaActuel: number, 
    demandeur: Utilisateur
  ) {
    super(idDemande, dateDemande, dateTraitement, statut, raison, demandeur);
    this.augmentationDemandeeGo = augmentationDemandeeGo;
    this.quotaActuel = quotaActuel;
  }

  public getAugmentationDemandee(): number {
    return this.augmentationDemandeeGo;
  }

  public getQuotaActuel(): number {
    return this.quotaActuel;
  }

  public getQuotaTotal(): number {
    return this.quotaActuel + this.augmentationDemandeeGo;
  }

  public setAugmentationDemandee(augmentationDemandeeGo: number): void {
    this.augmentationDemandeeGo = augmentationDemandeeGo;
  }

  public setQuotaActuel(quotaActuel: number): void {
    this.quotaActuel = quotaActuel;
  }
}


