import { Utilisateur } from "@prisma/client";

export class UtilisateurMetier {
  private utilisateur: Utilisateur;

  constructor(utilisateur: Utilisateur) {
    this.utilisateur = utilisateur;
  }

  getNomUtilisateur(): string {
    return this.utilisateur.nomUtilisateur;
  }

  setNomUtilisateur(nom: string): void {
    this.utilisateur.nomUtilisateur = nom;
  }

  getMotDePasse(): string {
    return this.utilisateur.motDePasse;
  }

  setMotDePasse(mdp: string): void {
    this.utilisateur.motDePasse = mdp;
  }

  getId(): string {
    return this.utilisateur.id;
  }

  setId(id: string): void {
    this.utilisateur.id = id;
  }

  comparerMDP(mdp: string): boolean {
    return this.utilisateur.motDePasse === mdp;
  }

  comparerVisage(visage: string): boolean {
    // À implémenter selon votre méthode de reconnaissance faciale
    return false;
  }
}
