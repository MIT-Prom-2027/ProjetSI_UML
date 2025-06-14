export class Application {
  private cheminInstallation!: string
  constructor(
    private idApplication: number,
    private nomApplication: string,
    private version: string,
  ) {}

  getVersion = (): string => this.version
  getIdApplication = (): number => this.idApplication
  getNomApplication = (): string => this.nomApplication
  getCheminInstallation = (): string => this.cheminInstallation

  setVersion = (version: string): void => {
    this.version = version
  }
  setIdApplication = (idApplication: number): void => {
    this.idApplication = idApplication
  }
  setNomApplication = (nomApplication: string): void => {
    this.nomApplication = nomApplication
  }
  setCheminInstallation = (cheminInstallation: string): void => {
    this.cheminInstallation = cheminInstallation
  }

  static getToutesApplication = (): Application[] => {
    // Import des données fictives
    const { applicationsFictives } = require("./data/mock-data")
    return applicationsFictives || []
  }
}
