import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdmittedStudent, Etudiant, ParcourLevelType, StudyLevelType } from "@/lib/types";
import { getAdmittedStudentsByLevelAndCourse } from "@/lib/data";
import { UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { post } from "@/lib/post";
import { useRegistration } from "@/context/RegistrationContext";

interface StepThreeProps {
  selectedLevel: StudyLevelType;
  selectedCourse: ParcourLevelType;
  selectedStudent: string;
  student: Etudiant;
  onSelectStudent: (student: AdmittedStudent) => void;
  onNext: () => void;
  onBack: () => void;
}

const dt: AdmittedStudent[]= [
  {
    id: "1",
    name: "Tsanta",
    firstname: "Mirindra",
    levelId: {},
    courseId: {}
  }
]

export default function StepThree({
  selectedLevel,
  selectedCourse,
  selectedStudent,
  onSelectStudent,
  onNext,
  onBack,
}: StepThreeProps) {

  const [admittedStudents, setAdmittedStudents] = useState<AdmittedStudent[]>(dt);
  const { registrationState} =
    useRegistration();

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_ETUDIANTS_ADMIS}`  
        const data:{etudiants_admis:AdmittedStudent[]} = await post(url,{niveau:selectedLevel.id_niveau,parcours:selectedCourse.id_parcour, id_annee_univ: registrationState.schoolYear.id_annee_univ});
        setAdmittedStudents(data && data.etudiants_admis );
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLevel();
  }, [selectedLevel]);

  console.log("Tetoo");
  
  console.log(registrationState);
  

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sélectionnez votre nom
        </h2>
        <p className="text-gray-600">
          Choisissez votre nom dans la liste des étudiants admis pour ce niveau
          et parcours
        </p>
      </div>

      {admittedStudents.length === 0 ? (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">
              Aucun étudiant admis trouvé pour ce niveau et parcours.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 max-w-2xl mx-auto">
          {admittedStudents.map((student: AdmittedStudent) => (
            <Card
              key={student.id}
              className={`cursor-pointer transition-all ${
                selectedStudent === student.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => onSelectStudent(student)}
            >
              <CardHeader className="py-4">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-base">{student.name} {student.firstname}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4 pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!selectedStudent} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
}
