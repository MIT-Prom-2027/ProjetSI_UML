export class Application {
    private idApplication: number;
    private nomApplication: string;
    private version: string;
    private cheminInstallation: string;
    private dateInstallation: Date;
  
    constructor(idApplication: number, nomApplication: string, version: string, cheminInstallation: string, dateInstallation: Date) {
      this.idApplication = idApplication;
      this.nomApplication = nomApplication;
      this.version = version;
      this.cheminInstallation = cheminInstallation;
      this.dateInstallation = dateInstallation;
    }
  
    public getNomApplication(): string {
      return this.nomApplication;
    }
  
    public getVersion(): string {
      return this.version;
    }
  
    public getCheminInstallation(): string {
      return this.cheminInstallation;
    }
  
    public getDateInstallation(): Date {
      return this.dateInstallation;
    }
    public getIdApplication(): number {
        return this.idApplication;
      }
    // Setters
    public setIdApplication(idApplication: number): void {
      this.idApplication = idApplication;
    }
  
    public setNomApplication(nomApplication: string): void {
      this.nomApplication = nomApplication;
    }
  
    public setVersion(version: string): void {
      this.version = version;
    }
  
    public setCheminInstallation(cheminInstallation: string): void {
      this.cheminInstallation = cheminInstallation;
    }
  
    public setDateInstallation(dateInstallation: Date): void {
      this.dateInstallation = dateInstallation;
    }
  }
  
  
  