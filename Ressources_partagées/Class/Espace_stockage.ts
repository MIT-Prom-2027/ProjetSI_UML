import { PermissionType } from "./Administrateur";
import { Fichier } from "./Fichier";
import { Utilisateur } from "./Utilisateur";

export class EspaceStockage {
    constructor(private compte: Utilisateur, private cheminAcces: string, private permissions: PermissionType[]) {
        this.compte = compte;
        this.cheminAcces = cheminAcces;
        this.permissions = permissions;
    }
    public getCompte = (): Utilisateur => this.compte;
    public getCheminAcces = (): string => this.cheminAcces;
    public getPermissions = (): PermissionType[] => this.permissions;
    public setCompte = (compte: Utilisateur): void => { this.compte = compte; }
    public setCheminAcces = (cheminAcces: string): void => { this.cheminAcces = cheminAcces; }
    public setPermissions = (permissions: PermissionType[]): void => { this.permissions = permissions; }

    public ajouterFichier = (fichier: Fichier): void => {
        // Logique pour ajouter un fichier à l'espace de stockage
        console.log(`Fichier ${fichier.getNomFichier()} ajouté à l'espace de stockage de ${this.compte.getNomUtilisateur()}`);
    }
    public supprimerFichier = (fichier: Fichier): void => {
        // Logique pour supprimer un fichier de l'espace de stockage
        console.log(`Fichier ${fichier.getNomFichier()} supprimé de l'espace de stockage de ${this.compte.getNomUtilisateur()}`);
    }
    public listerFichiers = (): Fichier[] => {
        // Logique pour lister les fichiers dans l'espace de stockage
        console.log(`Liste des fichiers dans l'espace de stockage de ${this.compte.getNomUtilisateur()}`);
        return []; // Retourne une liste vide pour l'instant
    }
}
