import get from "./get";
import { getStudyLevels } from "./static_get";
import { StudyLevel, Course, AdmittedStudent, Student } from "./types";

export const UNIVERSITY_INFO = {
  name: "Mention Informatique et Technologie",
  description:
    "Immergez-vous dans le monde de la Science, de la technologie, de l' ingénierie et des Mathématiques en intégrant la MIT, la toute nouvelle mention du Domaine des Sciences et Technologies de l'Université d'Antananarivo",
  address: "Université d'Antananarivo BP 906 Ankatso, Madagascar",
  phone: "(+261) 34 53 140 38",
  email: "administration@mit-ua.mg",
};


export const STUDY_LEVELS: StudyLevel[] =   [
    {
      id: "licence",
      name: "Licence",
      description: "Diplôme de premier cycle universitaire (3 ans)",
      courses: [
        { id: "info", name: "Informatique" },
        { id: "math", name: "Mathématiques" },
        { id: "phys", name: "Physique" },
      ],
    },
    {
      id: "master",
      name: "Master",
      description: "Diplôme de deuxième cycle universitaire (2 ans)",
      courses: [
        { id: "info", name: "Informatique" },
        { id: "math", name: "Mathématiques" },
        { id: "phys", name: "Physique" },
      ],
    },
    {
      id: "doctorat",
      name: "Doctorat",
      description: "Diplôme de troisième cycle universitaire (3-5 ans)",
      courses: [
        { id: "info", name: "Informatique" },
        { id: "math", name: "Mathématiques" },
        { id: "phys", name: "Physique" },
      ],      
    },
  ];

export const COURSES: Course[] = [
  // Licence courses
  {
    id: "licence-informatique",
    name: "Licence en Informatique",
    description:
      "Formation en développement logiciel et systèmes informatiques",
    levelId: "licence",
  },
  {
    id: "licence-gestion",
    name: "Licence en Gestion",
    description: "Formation en management et administration des entreprises",
    levelId: "licence",
  },
  {
    id: "licence-droit",
    name: "Licence en Droit",
    description: "Formation juridique fondamentale",
    levelId: "licence",
  },
  // Master courses
  {
    id: "master-ia",
    name: "Master en Intelligence Artificielle",
    description: "Spécialisation en IA et apprentissage automatique",
    levelId: "master",
  },
  {
    id: "master-finance",
    name: "Master en Finance",
    description: "Spécialisation en finance d'entreprise et marchés financiers",
    levelId: "master",
  },
  {
    id: "master-droit-affaires",
    name: "Master en Droit des Affaires",
    description: "Spécialisation en droit commercial et des sociétés",
    levelId: "master",
  },
  // Doctorat courses
  {
    id: "doctorat-informatique",
    name: "Doctorat en Informatique",
    description: "Recherche avancée en informatique",
    levelId: "doctorat",
  },
  {
    id: "doctorat-economie",
    name: "Doctorat en Sciences Économiques",
    description: "Recherche en économie et finance",
    levelId: "doctorat",
  },
];

export const ADMITTED_STUDENTS: AdmittedStudent[] = [
  // Licence Informatique
  {
    id: "1",
    name: "Ahmed Ben Ali",
    levelId: "licence",
    courseId: "licence-informatique",
  },
  {
    id: "2",
    name: "Fatma Gharbi",
    levelId: "licence",
    courseId: "licence-informatique",
  },
  {
    id: "3",
    name: "Mohamed Trabelsi",
    levelId: "licence",
    courseId: "licence-informatique",
  },
  {
    id: "4",
    name: "Aicha Bouazizi",
    levelId: "licence",
    courseId: "licence-informatique",
  },

  // Licence Gestion
  {
    id: "5",
    name: "Karim Sassi",
    levelId: "licence",
    courseId: "licence-gestion",
  },
  {
    id: "6",
    name: "Leila Mansouri",
    levelId: "licence",
    courseId: "licence-gestion",
  },
  {
    id: "7",
    name: "Youssef Hamdi",
    levelId: "licence",
    courseId: "licence-gestion",
  },

  // Licence Droit
  {
    id: "8",
    name: "Sarra Jemli",
    levelId: "licence",
    courseId: "licence-droit",
  },
  {
    id: "9",
    name: "Nabil Cherni",
    levelId: "licence",
    courseId: "licence-droit",
  },

  // Master IA
  { id: "10", name: "Ines Khelil", levelId: "master", courseId: "master-ia" },
  { id: "11", name: "Rami Zaouali", levelId: "master", courseId: "master-ia" },

  // Master Finance
  {
    id: "12",
    name: "Nour Smaoui",
    levelId: "master",
    courseId: "master-finance",
  },
  {
    id: "13",
    name: "Hatem Brahem",
    levelId: "master",
    courseId: "master-finance",
  },

  // Master Droit des Affaires
  {
    id: "14",
    name: "Dorra Mejri",
    levelId: "master",
    courseId: "master-droit-affaires",
  },

  // Doctorat
  {
    id: "15",
    name: "Slim Baccouche",
    levelId: "doctorat",
    courseId: "doctorat-informatique",
  },
  {
    id: "16",
    name: "Meriem Guidara",
    levelId: "doctorat",
    courseId: "doctorat-economie",
  },
];

// Mock students data for admin dashboard
export const MOCK_STUDENTS: Student[] = [
  {
    id: "student-1",
    nom: "Ben Ali",
    prenom: "Ahmed",
    email: "ahmed.benali@email.com",
    telephone: "+216 20 123 456",
    numInscription: "2024001",
    dateNaissance: "2000-03-15",
    lieuNaissance: "Tunis",
    niveau: "Licence",
    levelId: "licence",
    courseId: "licence-informatique",
    documents: {},
    status: "pending",
    createdAt: new Date("2024-01-15"),
    photoUrl: "/placeholder.svg",
  },
  {
    id: "student-2",
    nom: "Gharbi",
    prenom: "Fatma",
    email: "fatma.gharbi@email.com",
    telephone: "+216 25 234 567",
    numInscription: "2024002",
    dateNaissance: "1999-07-22",
    lieuNaissance: "Sfax",
    niveau: "Licence",
    levelId: "licence",
    courseId: "licence-informatique",
    documents: {},
    status: "validated",
    createdAt: new Date("2024-01-16"),
    photoUrl: "/placeholder.svg",
  },
  {
    id: "student-3",
    nom: "Trabelsi",
    prenom: "Mohamed",
    email: "mohamed.trabelsi@email.com",
    telephone: "+216 28 345 678",
    numInscription: "2024003",
    dateNaissance: "2001-11-08",
    lieuNaissance: "Sousse",
    niveau: "Licence",
    levelId: "licence",
    courseId: "licence-gestion",
    documents: {},
    status: "rejected",
    createdAt: new Date("2024-01-17"),
    photoUrl: "/placeholder.svg",
  },
  {
    id: "student-4",
    nom: "Khelil",
    prenom: "Ines",
    email: "ines.khelil@email.com",
    telephone: "+216 22 456 789",
    numInscription: "2024004",
    dateNaissance: "1998-05-12",
    lieuNaissance: "Monastir",
    niveau: "Master",
    levelId: "master",
    courseId: "master-ia",
    documents: {},
    status: "pending",
    createdAt: new Date("2024-01-18"),
    photoUrl: "/placeholder.svg",
  },
  {
    id: "student-5",
    nom: "Sassi",
    prenom: "Karim",
    email: "karim.sassi@email.com",
    telephone: "+216 27 567 890",
    numInscription: "2024005",
    dateNaissance: "2000-09-30",
    lieuNaissance: "Gabès",
    niveau: "Licence",
    levelId: "licence",
    courseId: "licence-gestion",
    documents: {},
    status: "validated",
    createdAt: new Date("2024-01-19"),
    photoUrl: "/placeholder.svg",
  },
];

export const getCoursesByLevel = (levelId: string): Course[] => {
  return COURSES.filter((course) => course.levelId === levelId);
};

export const getAdmittedStudentsByLevelAndCourse = (
  levelId: string,
  courseId: string,
): AdmittedStudent[] => {
  return ADMITTED_STUDENTS.filter(
    (student) => student.levelId === levelId && student.courseId === courseId,
  );
};

export const getLevelById = (levelId: string): StudyLevel | undefined => {
  return STUDY_LEVELS.find((level) => level.id === levelId);
};

export const getCourseById = (courseId: string): Course | undefined => {
  return COURSES.find((course) => course.id === courseId);
};

export const getAdmittedStudentById = (
  studentId: string,
): AdmittedStudent | undefined => {
  return ADMITTED_STUDENTS.find((student) => student.id === studentId);
};
