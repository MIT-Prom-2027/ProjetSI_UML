// Demande.ts
import { Materiel } from "./Materiel";

export class Demande {
  constructor(
    public idDemande: number,
    public motif: string,
    public dateDebut: string,
    public dateFin: Date,
    public commentaire: string,
    public status: string,
    public materiel: Materiel,
  ) {}

  Demande(): void {
    // logique de création
  }
}
