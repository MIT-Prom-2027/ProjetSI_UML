import get from "./get";
import { Course, StudyLevel } from "./types";

export const getParcours = async (levelId:string): Promise<Course[]> => {
  const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_PARCOURS_API}${levelId}`
  const data = await get(url);
  return [
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
}

export const getStudyLevels = async (): Promise<{}|void> => {
  const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_NIVEAU_API}`  
  const data = await get(url);
  return data;
};


