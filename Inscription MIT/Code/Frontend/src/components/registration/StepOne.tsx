import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudyLevel, StudyLevelType } from "@/lib/types";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import get from "@/lib/get";
import { number } from "zod";

interface StepOneProps {
  selectedLevel: StudyLevelType;
  onSelectLevel: (levelId: StudyLevelType) => void;
  onBack: () => void;
  onNext: () => void;
}

const dt: StudyLevelType[] = [
  {
    id_niveau:1,
    niv:"LICENCE 1",
    descr:"Test"
  }
]

export default function StepOne({
  selectedLevel,
  onSelectLevel,
  onNext,
  onBack,
}: StepOneProps) {

  const [studyLevel, setStudyLevel] = useState<StudyLevelType[]>(dt);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_NIVEAU_API}`  
        const data = await get(url);
        setStudyLevel(data.niveaux);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLevel();
  }, [selectedLevel]);
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choisissez votre niveau d'étude
        </h2>
        <p className="text-gray-600">
          Sélectionnez le niveau d'étude dans lequel vous souhaitez vous
          inscrire
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {studyLevel.map((level: StudyLevelType) => (
          <Card
            key={level.id_niveau}
            className={`cursor-pointer transition-all ${
              selectedLevel.id_niveau === level.id_niveau
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-md"
            }`}
            onClick={() => onSelectLevel(level)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-lg">{level.niv}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{level.descr}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!selectedLevel} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
}
