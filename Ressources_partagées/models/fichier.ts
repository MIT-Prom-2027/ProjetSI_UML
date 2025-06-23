export class Fichier {
    private idFichier: number;
    private nomFichier: string;
    private taille: number;
    private dateCreation: Date;
    private cheminComplet: string;
  
    constructor(idFichier: number, nomFichier: string, taille: number, dateCreation: Date, cheminComplet: string) {
      this.idFichier = idFichier;
      this.nomFichier = nomFichier;
      this.taille = taille;
      this.dateCreation = dateCreation;
      this.cheminComplet = cheminComplet;
    }
  
    public getNomFichier(): string {
      return this.nomFichier;
    }
  
    public gettaille(): number {
      return this.taille;
    }
  
    public getCheminAcces(): string {
      return this.cheminComplet;
    }
  
    public getdateCreation(): Date {
      return this.dateCreation;
    }
  
    public async supprimerFichier(): Promise<boolean> {
        try {
            const response = await fetch("/api/file",
                {
                    method: "DELETE",
                    headers: {"Content-Type": "Application/json"},
                    body: JSON.stringify({file_id: this.idFichier})
                }
            )
            if(!response) 
                throw new Error("Erreur lors de l'accès à l'api")

            const result = await response.json()
            
            if(!result) 
                throw new Error("Erreur lors de la récuperation des données")

            const is_delete = result.is_delete
            if (is_delete) {
                console.log(`Fichier ${this.nomFichier} (ID: ${this.idFichier}) supprimé.`);
                return is_delete
            }
            return is_delete

        } catch (error) {
            throw new Error("Echec d'accès à l'api files")
        }
    }

    static async getTousFichiers (): Promise<Fichier[]> {
        const fichiers: Fichier[] = await getFichiers()
        return fichiers
    }  

    // Getters and Setters for all attributes
    public getIdFichier(): number {
      return this.idFichier;
    }
  
    public setIdFichier(idFichier: number): void {
      this.idFichier = idFichier;
    }
  
    public setNomFichier(nomFichier: string): void {
      this.nomFichier = nomFichier;
    }
  
    public settaille(taille: number): void {
      this.taille = taille;
    }
  
    public setDateCreation(dateCreation: Date): void {
      this.dateCreation = dateCreation;
    }
  
    public setdateCreation(dateCreation: Date): void {
      this.dateCreation = dateCreation;
    }
  
    public setCheminComplet(cheminComplet: string): void {
      this.cheminComplet = cheminComplet;
    }
  }
  
  
async function getFichiers(): Promise<Fichier[]> {
    try {
        const response = await fetch("/api/file",
            {
                method: "GET",
                headers: {"Content-Type": "Application/json"},
            }
        )
        if(!response) 
            throw new Error("Erreur lors de l'accès à l'api")

        const result = await response.json()
        
        if(!result || !result.data) 
            throw new Error("Erreur lors de la récuperation des données")

        const data: Fichier[] = result.data
        return data

    } catch (error) {
        throw new Error("Echec d'accès à l'api files")
    }
}