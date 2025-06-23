import { Notification } from "@/models";

export abstract class Personne {
  protected idPersonne: number;
  protected nom: string;
  protected prenom: string;
  protected email: string;
  
  constructor(idPersonne: number, nom: string, prenom: string, email: string) {
    this.idPersonne = idPersonne;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }

  public async recevoirNotification(notification: Notification): Promise<Notification[]> {  
    try{
        const response = await fetch("/api/notification",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                recipient_id: this.idPersonne
            })
        })

        if(!response) {
            throw new Error("Erreur lors de la récupération des données de Notification.")
        }
        const result = await response.json()
        if (!result.data) throw new Error("Erreur lors de la récupération des données de Notification.")

        const notifications: Notification[] = result.data()
        return notifications
    } catch (error) {
        console.log(error)
        return []
    }
  };

  
  // Getters
  public getIdPersonne(): number {
    return this.idPersonne;
  }

  public getNom(): string {
    return this.nom;
  }

  public getPrenom(): string {
    return this.prenom;
  }

  public getEmail(): string {
    return this.email;
  }

  // Setters
  public setIdPersonne(idPersonne: number): void {
    this.idPersonne = idPersonne;
  }

  public setNom(nom: string): void {
    this.nom = nom;
  }

  public setPrenom(prenom: string): void {
    this.prenom = prenom;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
  static getTousPersonnes(): Personne[] {
    
    return []
  }
}


