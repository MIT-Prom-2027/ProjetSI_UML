import type { Utilisateur } from "./Utilisateur"

export class Session {
  private idSession = -1
  private dateOuverture: Date = new Date()
  private dateFermeture!: Date
  private ipConnectee = ""
  private macConnectee = ""

  constructor(private compteUtilisateur: Utilisateur) {
    this.compteUtilisateur = compteUtilisateur
    this.dateOuverture = new Date()
  }

  public setDateFin = (dateFermeture: Date): void => {
    this.dateFermeture = dateFermeture
  }
  public setCompteUtilisateur = (compteUtilisateur: Utilisateur): void => {
    this.compteUtilisateur = compteUtilisateur
  }
  public setIdSession = (idSession: number): void => {
    this.idSession = idSession
  }

  public getDateDebut = (): Date => this.dateOuverture
  public getDateFin = (): Date => this.dateFermeture
  public getCompteUtilisateur = (): Utilisateur => this.compteUtilisateur
  public getIdSession = (): number => this.idSession

  public getIpConnectee = (): string => this.ipConnectee
  public getMacConnectee = (): string => this.macConnectee
  public setIpConnectee = (ip: string): void => {
    this.ipConnectee = ip
  }
  public setMacConnectee = (mac: string): void => {
    this.macConnectee = mac
  }

  public static getToutesSessions = (): Session[] => {
    // Import des données fictives
    const { sessionsFictives } = require("./data/mock-data")
    return sessionsFictives || []
  }

  public getSessionId = (): number => this.idSession

  public afficherDetailsSession = (): string => {
    return `Session ID: ${this.idSession}, Ouverture: ${this.dateOuverture}, Fermeture: ${this.dateFermeture}, Utilisateur: ${this.compteUtilisateur.getNomUtilisateur()}, IP: ${this.ipConnectee}, MAC: ${this.macConnectee}`
  }
}
