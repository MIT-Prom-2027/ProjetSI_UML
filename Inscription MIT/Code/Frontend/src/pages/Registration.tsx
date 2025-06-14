import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationFormData, DocumentUpload, AdmittedStudent, StudyLevelType, ParcourLevelType, Etudiant } from "@/lib/types";
import ProgressIndicator from "@/components/registration/ProgressIndicator";
import StepOne from "@/components/registration/StepOne";
import StepTwo from "@/components/registration/StepTwo";
import StepThree from "@/components/registration/StepThree";
import StepFour from "@/components/registration/StepFour";
import StepFive from "@/components/registration/StepFive";
import Confirmation from "@/components/registration/Confirmation";
import { GraduationCap } from "lucide-react";
import { post, post_mult } from "@/lib/post";
import { useRegistration } from "@/context/RegistrationContext";
import get from "@/lib/get";
import StudentSelectionDialog from "@/components/dialogs/StudentSelectionDialog";

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    levelId:   {
      id_niveau:0,
      niv:"",
      descr:""
    },
    courseId:   {
      id_parcour:0,
      parcour:"",
      descr:""
    },
    admittedStudentId: "",
    etudiantInfo:{
      id: "",
      nom: "",
      prenom: "",
      email: "",
      num_inscription: "",
      // annee_bacc: "2025",
      serie: "",
      tel: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "",
      genre: null,
      adresse: "",
      cin: ""
    }
  });
  const [documents, setDocuments] = useState<DocumentUpload>({});
  const [openDialog, setOpenDialog] = useState<Boolean>(false);
  const [etudiantList, setEtudiantsList] = useState<Etudiant[]>([]);

  const totalSteps = 6;

  const handleSelectLevel = (levelId: StudyLevelType) => {
    setFormData((prev) => ({
      ...prev,
      levelId,
      admittedStudentId: "",
    }));
  };

  const handleSelectCourse = (courseId: ParcourLevelType) => {
    setFormData((prev) => ({
      ...prev,
      courseId,
      admittedStudentId: "", // Reset student when course changes
    }));
  };

  const handleSelectStudent = (admittedStudent: AdmittedStudent) => {
    setFormData((prev) => ({
      ...prev,
      admittedStudentId: admittedStudent.id,
      etudiantInfo: {
        ...prev.etudiantInfo,
        nom: admittedStudent.name,
        prenom: admittedStudent.firstname,
      },
    }));
  };

  const handleUpdateFormData = (data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev,etudiantInfo: {  ...prev.etudiantInfo,...data} }));
  };

  const handleUpdateDocuments = (docs: DocumentUpload) => {
    setDocuments(docs);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleNextStepThree = async() => {
    const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_ETUDIANT_BY_NAME}`  
    const data:{etudiant:Etudiant[]} = await post(url,{nom:formData.etudiantInfo.nom, prenom:formData.etudiantInfo.prenom});    

    if(data.etudiant.length == 1){
      selectedStudent(data.etudiant[0] as Etudiant)
      console.log(formData);      
    }
    else if (data.etudiant.length>1){
      showDialog(data.etudiant);
    }
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
    const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_INSCRIPTION}`  
    post_mult(url, formData, documents)
      .then((response) => {console.log("Success:", response); navigate("/merci");})
      .catch((error) => {console.error("Error:", error);navigate("/erreur")});
  };

  const { registrationState} =
    useRegistration();
  const isRegistrationActive = registrationState.isActive;  

  // if(!isRegistrationActive) window.location.href = "/";

  const showDialog = (etudiants:Etudiant[])=>{
    setEtudiantsList(etudiants);
    setOpenDialog(true);
  }

  const selectedStudent = (etudiant:Etudiant)=>{
    setFormData((prev) => ({
      ...prev,
      etudiantInfo: etudiant
    }));      
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            selectedLevel={formData.levelId}
            onSelectLevel={handleSelectLevel}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <StepTwo
            selectedLevel={formData.levelId}
            selectedCourse={formData.courseId}
            onSelectCourse={handleSelectCourse}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <StepThree
            selectedLevel={formData.levelId}
            selectedCourse={formData.courseId}
            selectedStudent={formData.admittedStudentId}
            student={formData.etudiantInfo}
            onSelectStudent={handleSelectStudent}
            onNext={handleNextStepThree}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <StepFour
            formData={formData}
            onUpdateFormData={handleUpdateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <StepFive
            documents={documents}
            onUpdateDocuments={handleUpdateDocuments}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Confirmation
            formData={formData}
            documents={documents}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Inscription Universitaire
            </h1>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>

      {/* Dialogue list etudiant */}
      {openDialog && (
        <StudentSelectionDialog
          students={etudiantList}
          onClose={() => setOpenDialog(false)}
          onConfirm={(student) => {
            selectedStudent(student);
            setOpenDialog(false);
            console.log("Étudiant sélectionné :", student);
          }}
        />
      )}      
    </div>
  );
}
