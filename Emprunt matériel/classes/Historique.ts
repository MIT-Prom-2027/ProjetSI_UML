// Historique.ts
import { Utilisateur } from "./Utilisateur";
import { Demande } from "./Demande";

export class Historique {
  constructor(
    public idHistorique: number,
    public dateDebut: Date,
    public dateFin: Date,
    public utilisateur: Utilisateur,
    public commentaire: string,
    public demande: Demande,
  ) {}

  affiche(): void {
    // logique d'affichage
  }

  enregistrer(): void {
    // logique d'enregistrement
  }

  recherche(): void {
    // logique de recherche
  }
}
