export interface StudyLevel {
  id: string;
  name: string;
  description: string;
  courses?: [
  { id: "info", name: "Informatique" },
  { id: "math", name: "Mathématiques" },
  { id: "phys", name: "Physique" },
],
}

export interface Course {
  id: string;
  name: string;
  description: string;
  levelId: string;
}

export interface AdmittedStudent {
  id: string;
  name: string;
  firstname: string;  
  levelId: StudyLevelType;
  courseId: ParcourLevelType;
}

export interface StudentFile {
  id: string;
  level: string;
  course: string;
  fileName: string;
  file: File;
  uploadDate: Date;
}

export interface RegistrationFormData {
  levelId: StudyLevelType;
  courseId: ParcourLevelType;
  admittedStudentId: string;
  etudiantInfo:Etudiant
}

export interface DocumentUpload {
  photo?: File|string;
  cin_recto?: File|string;
  cin_verso?: File|string;  
  residence?: File|string;
  releve_de_note?: File|string;
  recu_faculte?: File|string;
}

export interface Student {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  numInscription: string;
  dateNaissance: string;
  lieuNaissance: string;
  niveau: string;
  levelId: string;
  courseId: string;
  documents: DocumentUpload;
  status: "pending" | "validated" | "rejected";
  createdAt: Date;
  photoUrl?: string;
}

export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export type Sexe = 'M' | 'F' | 'O' |null;

export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  num_inscription: string;
  serie: string;
  tel: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  genre: Sexe;
  adresse: string;
  cin: string;
}

export type StudyLevelType = {
  id_niveau?: number;
  niv?: string;
  descr?: string;
};

export type ParcourLevelType = {
  id_parcour?: number;
  parcour?: string;
  descr?: string;
};

export type AdminData = {
  pending?: Inscription[];
  valid?: Inscription[];
  invalid?: Inscription[]
}

export type Inscription = {
  id_inscription: Number;
  statut:'en attente' | 'validé'| 'Rejetté';
  levelId: StudyLevelType;
  courseId: ParcourLevelType;
  admittedStudentId: string;
  date_soumission?:Date;
  etudiantInfo:Etudiant  
}

export type RegistrationState = {
  isActive?: Boolean;
  currentStep?: number;
  uploadedFiles?: StudentFile[],
  schoolYear?:SchoolYear,  
  registrationPeriod?:RegistrationPeriod
}

export type SchoolYear = {
	id_annee_univ?:string,
	date_debut?:Date,
	date_fin?:Date,
  date_inscription?: RegistrationPeriod
}

export type RegistrationPeriod = {
	date_debut:Date,
	date_fin:Date  
}