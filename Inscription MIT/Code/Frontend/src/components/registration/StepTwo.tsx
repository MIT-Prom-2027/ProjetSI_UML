import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course, ParcourLevelType, StudyLevelType } from "@/lib/types";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import get from "@/lib/get";
import { getCoursesByLevel } from "@/lib/data";

interface StepTwoProps {
  selectedLevel: StudyLevelType;
  selectedCourse: ParcourLevelType;
  onSelectCourse: (courseId: ParcourLevelType) => void;
  onNext: () => void;
  onBack: () => void;
}

const dt: ParcourLevelType[] = [
  {
    id_parcour:1,
    parcour:"INFO",
    descr:"Test"
  }
]


export default function StepTwo({
  selectedLevel,
  selectedCourse,
  onSelectCourse,
  onNext,
  onBack,
}: StepTwoProps) {

  const [availableCourses, setAVailableCourses] = useState<ParcourLevelType[]>(dt);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_PARCOURS_API}${selectedLevel.id_niveau}`
        console.log(url);
        
        const data = await get(url);
        setAVailableCourses(data.parcours);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [availableCourses]);

  console.log(availableCourses);
  

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choisissez votre parcours
        </h2>
        <p className="text-gray-600">
          Sélectionnez le parcours d'études qui vous intéresse
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {availableCourses.map((course: ParcourLevelType) => (
          <Card
            key={course.id_parcour}
            className={`cursor-pointer transition-all ${
              selectedCourse.id_parcour === course.id_parcour
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:shadow-md"
            }`}
            onClick={() => onSelectCourse(course)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-green-600" />
                <CardTitle className="text-lg">{course.parcour}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{course.descr}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-4 pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!selectedCourse} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
}