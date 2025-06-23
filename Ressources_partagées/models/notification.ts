import { TypeNotification } from "./enums";

export class Notification {
    private idNotification: number = -1;
    private message: string;
    private dateEnvoi: Date;
    private estLue: boolean;
    private type: TypeNotification;
    // private id_personne: number;

    constructor(
        message: string, 
        dateEnvoi: Date, 
        estLue: boolean, 
        type: TypeNotification,
        // id_personne: number
    ) {
        this.message = message;
        this.dateEnvoi = dateEnvoi;
        this.estLue = estLue;
        this.type = type;
        // this.id_personne = id_personne;
    }

  public getMessage(): string {
    return this.message;
  }

  public getDateEnvoi(): Date {
    return this.dateEnvoi;
  }

  public marquerCommeLue(): void {
    this.estLue = true;
    console.log(`Notification ${this.idNotification} marquée comme lue.`);
  }

  public getLue(): boolean {
    return this.estLue;
  }

  public getType(): TypeNotification {
    return this.type;
  }

  // Getters and Setters for all attributes
  public getIdNotification(): number {
    return this.idNotification;
  }

  public setIdNotification(idNotification: number): void {
    this.idNotification = idNotification;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public setDateEnvoi(dateEnvoi: Date): void {
    this.dateEnvoi = dateEnvoi;
  }

  public setEstLue(estLue: boolean): void {
    this.estLue = estLue;
  }

  public setType(type: TypeNotification): void {
    this.type = type;
  }
  // public getIdPersonne = (): number => this.id_personne
}


