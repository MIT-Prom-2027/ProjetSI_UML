import { Profession } from "./Profession"

export class Personne {
  private id : string
  private nom: string
  private prenom: string | null
  private email: string | null
  private image: string | null
  private profession: Profession | Profession.ETUDIANT

  constructor(
    id: string, 
    nom: string, 
    prenom: string | null, 
    email: string | null, 
    image: string | null = null, 
    profession: Profession | Profession.ETUDIANT = Profession.ETUDIANT
  ) {
    this.id = id
    this.nom = nom
    this.prenom = prenom
    this.email = email
    this.image = image
    this.profession = profession
  }

  public getId(): string {
    return this.id
  }

  public getNom(): string {
    return this.nom
  }

  public getPrenom(): string | null{
    return this.prenom
  }

  public getEmail(): string | null {
    return this.email
  }

  public getImage(): string | null {
    return this.image
  }

  public getProfession(): Profession {
    return this.profession
  }

  public setId(id: string): void {
    this.id = id
  }

  public setNom(nom: string): void {
    this.nom = nom
  }

  public setPrenom(prenom: string): void {
    this.prenom = prenom
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public setImage(image: string): void {
    this.image = image
  }

  public setProfession(profession: Profession): void {
    this.profession = profession
  }
  
}
