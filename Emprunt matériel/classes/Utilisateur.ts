// Utilisateur.ts
import { Personne } from "./Personne";

export class Utilisateur {
  constructor(
    public idUtilisateur: number,
    public utilisateur: string,
    public motdepasse: string,
    public personne: Personne,
  ) {}

  connection(): void {
    // logique de connexion
  }

  Utilisateur(): void {
    // constructeur ou initialisation
  }
}
