import { PermissionType, Utilisateur, Fichier } from "@/models";
export enum typeEspaceStockage {
    PERSONNEL = "PERSONNEL",
    COMMUN = "COMMUN"
}
export class EspaceStockage {
    private cheminAcces: string;
    private tailleUtiliseeGo: number;
    private typeEspace: typeEspaceStockage = typeEspaceStockage.PERSONNEL; // 'Personnel' ou 'Commun'
    private quotaMaxGo: number; // Applicable pour l'espace personnel
    private permissions: Map<Utilisateur, PermissionType[]>; // Applicable pour l'espace commun

    constructor(
        cheminAcces: string, tailleUtiliseeGo: number, typeEspace: typeEspaceStockage, quotaMaxGo: number = 0, permissions: Map<Utilisateur, PermissionType[]> = new Map()) {
        this.cheminAcces = cheminAcces;
        this.tailleUtiliseeGo = tailleUtiliseeGo;
        this.typeEspace = typeEspace;
        this.quotaMaxGo = quotaMaxGo;
        this.permissions = permissions;
    }

    public async listerFichiers(): Promise<Fichier[]> {
        console.log(`Listing files in ${this.cheminAcces}`);
        try {
            const response = await fetch("/api/storage_space",
                {
                    method: "POST",
                    headers: {"Content-Type": "Application/json"},
                    body: JSON.stringify({path: this.cheminAcces})
                }
            )
            if(!response) 
                throw new Error("Erreur lors de l'accès à l'api")

            const result = await response.json()
            
            if(!result || !result.data) 
                throw new Error("Erreur lors de la récuperation des données")

            const files: Fichier[] = result.data
            return files

        } catch (error) {
            throw new Error("Echec d'accès à l'api files")
        }
    }

    public async ajouterFichier(fichier: Fichier): Promise<boolean> {
        // Logique pour ajouter un fichier
        try {
            const response = await fetch("/api/storage_space",
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

            const is_add: boolean = result.is_add
            if (is_add) console.log(`Adding file ${fichier.getNomFichier()} to ${this.cheminAcces}`);
            return is_add

        } catch (error) {
            throw new Error("Echec d'accès à l'api files")
        }
    }

    public async supprimerFichier(nomFichier: string): Promise<boolean> {
        const fichiers: Fichier[] = await Fichier.getTousFichiers()

        const index = fichiers.findIndex( (f) => 
            f.getNomFichier() === nomFichier  && f.getCheminAcces().includes(this.cheminAcces)
        )

        if(index !== -1) {
            fichiers[index].supprimerFichier()
        }
        // Logique pour supprimer un fichier
        console.log(`Deleting file ${nomFichier} from ${this.cheminAcces}`);
        return true;
    }

    public lireFichier(nomFichier: string): Fichier | null {
        // Logique pour lire un fichier
        console.log(`Reading file ${nomFichier} from ${this.cheminAcces}`);
        return null;
    }

    public getQuota(): number {
        return this.quotaMaxGo;
    }

    public getEspaceUtilise(): number {
        return this.tailleUtiliseeGo;
    }

    public getEspaceRestant(): number {
        return this.quotaMaxGo - this.tailleUtiliseeGo;
    }

    public setPermission(utilisateur: Utilisateur, permission: PermissionType, accorder: boolean): void {
        let userPermissions = this.permissions.get(utilisateur) || [];
        if (accorder && !userPermissions.includes(permission)) {
            userPermissions.push(permission);
        } else if (!accorder && userPermissions.includes(permission)) {
            userPermissions = userPermissions.filter(p => p !== permission);
        }
        this.permissions.set(utilisateur, userPermissions);
        console.log(`Permission ${permission} ${accorder ? 'granted to' : 'revoked from'} ${utilisateur.getNom()} for ${this.cheminAcces}`);
    }

    public getPermissions(utilisateur: Utilisateur): PermissionType[] {
        return this.permissions.get(utilisateur) || [];
    }

    public verifierPermission(utilisateur: Utilisateur, permission: PermissionType): boolean {
        return this.getPermissions(utilisateur).includes(permission);
    }

    // Getters and Setters for properties
    public getCheminAcces(): string {
        return this.cheminAcces;
    }

    public setCheminAcces(cheminAcces: string): void {
        this.cheminAcces = cheminAcces;
    }

    public getTailleUtiliseeGo(): number {
        return this.tailleUtiliseeGo;
    }

    public setTailleUtiliseeGo(tailleUtiliseeGo: number): void {
        this.tailleUtiliseeGo = tailleUtiliseeGo;
    }

    public getTypeEspace(): string {
        return this.typeEspace;
    }

    public setTypeEspace(typeEspace: typeEspaceStockage): void {
        this.typeEspace = typeEspace;
    }

    public setQuotaMaxGo(quotaMaxGo: number): void {
        this.quotaMaxGo = quotaMaxGo;
    }

    public setAllPermissions(permissions: Map<Utilisateur, PermissionType[]>): void {
        this.permissions = permissions;
    }
}


