// Demandeur.ts
import { Utilisateur } from "./Utilisateur";
import { Demande } from "./Demande";

export class Demandeur {
  constructor(
    public idDemandeur: number,
    public demande: Demande,
    public utilisateur: Utilisateur,
  ) {}

  faireDemande(): void {
    // logique pour faire une demande
  }

  rendreMateriel(): void {
    // logique pour rendre un matériel
  }

  operation(): void {
    // autre logique métier
  }
}
