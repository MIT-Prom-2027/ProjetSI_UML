// Énumérations pour le système de gestion des ressources

export enum PermissionType {
    LIRE = "LIRE",
    ECRIRE = "ECRIRE",
    EXECUTER = "EXECUTER",
    ADMINISTRER = "ADMINISTRER",
  }
  
  export enum StatutDemande {
    EN_ATTENTE = "EN_ATTENTE",
    APPROUVEE = "APPROUVEE",
    REJETEE = "REJETEE",
  }
  
  export enum TypeNotification {
    QUOTA = "QUOTA",
    DEMANDE = "DEMANDE",
    SYSTEME = "SYSTEME",
  }
  
  export enum TypeFichier {
    DOCUMENT = "DOCUMENT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    ARCHIVE = "ARCHIVE",
    AUTRE = "AUTRE",
  }
  