import { EspaceStockage } from "./Espace_stockage";

export class Fichier {
    constructor (
        private idFichier: number, 
        private nomFichier: string,
        private espaceStockage: EspaceStockage
    ) {
        
    }
    public getIdFichier = (): number => this.idFichier;
    public getNomFichier = (): string => this.nomFichier;
    public getEspaceStockage = (): EspaceStockage => this.espaceStockage;
    public setIdFichier = (idFichier: number): void => { this.idFichier = idFichier; }
    public setNomFichier = (nomFichier: string): void => { this.nomFichier = nomFichier; }
    public setEspaceStockage = (espaceStockage: EspaceStockage): void => { this.espaceStockage = espaceStockage; }
    public getCheminAcces = (): string => {
        return this.espaceStockage.getCheminAcces();
    }
    public getDetailsFichier = (): string => {
        return `ID: ${this.idFichier}, Nom: ${this.nomFichier}, Espace de stockage: ${this.espaceStockage.getCheminAcces()}`;
    }
    public afficherDetailsFichier = (): string => {
        return `Fichier ID: ${this.idFichier}, Nom: ${this.nomFichier}, Espace de stockage: ${this.espaceStockage.getCheminAcces()}`;
    }
    public renommerFichier = (nouveauNom: string): void => {
        this.nomFichier = nouveauNom;
        console.log(`Le fichier a été renommé en: ${this.nomFichier}`);
    }
    public supprimerFichier = (): void => {
        console.log(`Le fichier ${this.nomFichier} a été supprimé de l'espace de stockage.`);
        // Logique pour supprimer le fichier de l'espace de stockage
    }
}
