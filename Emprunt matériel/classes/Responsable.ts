// Responsable.ts
import { Utilisateur } from "./Utilisateur";

export class Responsable {
  constructor(public idResponsable: number, public utilisateur: Utilisateur) {}

  valideDemande(): void {
    // logique de validation
  }

  changeStatus(): void {
    // logique de mise à jour du statut
  }
}
