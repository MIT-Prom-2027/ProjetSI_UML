export enum TypeNotification {
    INFO = "INFO",
    SUCCES = "SUCCES",
    AVERTISSEMENT = "AVERTISSEMENT",
    ERREUR = "ERREUR",
}

export class Notification {
    private idNotification: number = -1
    private dateEnvoi: Date
    private estLue: boolean = false
    private type: TypeNotification = TypeNotification.INFO        

    constructor(private destinataireId: number, private message: string) {
        this.dateEnvoi = new Date();
        this.destinataireId = destinataireId;
        this.message = message;
    }

    //Les Setters 
    public setIdNotification = (idNotification: number): void => {this.idNotification = idNotification}
    public setMessage = (message: string): void => {this.message = message}
    public setDestinataireId = (destinataireId: number): void => {this.destinataireId = destinataireId}
    public setEstLue = (estLue: boolean): void => {this.estLue = estLue}
    public setDateEnvoi = (dateEnvoi: Date): void => {this.dateEnvoi = dateEnvoi}
    public setType = (type: TypeNotification): void => {this.type = type}

    //Les Getters 
    public getIdNotification = (): number => this.idNotification
    public getMessage = (): string => this.message
    public getDestinataireId = (): number => this.destinataireId
    public getEstLue = (): boolean => this.estLue
    public getDateEnvoi = (): Date => this.dateEnvoi
    public getType = (): TypeNotification => this.type

    public envoiNotification = (): boolean => {
        return false
    }

}
