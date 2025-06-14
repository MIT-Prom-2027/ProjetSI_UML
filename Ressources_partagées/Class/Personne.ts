export abstract class Personne {
  private idPersonne = -1

  constructor(
    private nom: string,
    private prenom: string,
    private email: string,
  ) {
    this.nom = nom
    this.prenom = prenom
    this.email = email
  }

  //Les Setters
  public setNom = (nom: string): void => {
    this.nom = nom
  }
  public setPrenom = (prenom: string): void => {
    this.prenom = prenom
  }
  public setEmail = (email: string): void => {
    this.email = email
  }
  public setIdPersonne = (idPersonne: number): void => {
    this.idPersonne = idPersonne
  }

  //Les Getters
  public getNom = (): string => this.nom
  public getPrenom = (): string => this.prenom
  public getEmail = (): string => this.email
  public getIPersonne = (): number => this.idPersonne

  //Les methodes static
  static getTousPersonnes = (): Personne[] => {
    // Import des données fictives
    const { administrateursFictifs } = require("./data/mock-data")
    return administrateursFictifs || []
  }

  //Les methodes classiques
  abstract recevoirNotification(notification: Notification): void
}
