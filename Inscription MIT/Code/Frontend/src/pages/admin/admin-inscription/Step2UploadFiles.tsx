import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  ArrowLeft,
  ArrowRight,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { STUDY_LEVELS as LEVELS } from "@/lib/data";
import { StudentFile } from "@/lib/types";
import RegistrationStepper from "@/components/RegistrationStepper";

const Step2UploadFiles: React.FC = () => {
  const {
    addUploadedFile,
    removeUploadedFile,
    goToNextStep,
    goToPreviousStep,
    registrationState,
  } = useRegistration();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const selectedLevelData = LEVELS.find((level) => level.id === selectedLevel);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "text/csv", // .csv
      ];

      if (
        allowedTypes.includes(file.type) ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".xlsx")
      ) {
        setSelectedFile(file);
      } else {
        alert("Format de fichier non supporté. Utilisez .xlsx ou .csv");
        event.target.value = "";
      }
    }
  };

  const handleUpload = () => {
    if (!selectedLevel || !selectedCourse || !selectedFile) {
      alert("Veuillez sélectionner un niveau, un cours et un fichier");
      return;
    }

    const levelName = LEVELS.find((l) => l.id === selectedLevel)?.name || "";
    const courseName =
      LEVELS.find((l) => l.id === selectedLevel)?.courses.find(
        (c) => c.id === selectedCourse,
      )?.name || "";

    // Check if file already exists for this level/course combination
    const existingFile = registrationState.uploadedFiles.find(
      (f) => f.level === levelName && f.course === courseName,
    );

    if (existingFile) {
      if (
        !confirm(
          "Un fichier existe déjà pour ce niveau/cours. Voulez-vous le remplacer ?",
        )
      ) {
        return;
      }
      removeUploadedFile(existingFile.id);
    }

    const newFile: StudentFile = {
      id: Date.now().toString(),
      level: levelName,
      course: courseName,
      fileName: selectedFile.name,
      file: selectedFile,
      uploadDate: new Date(),
    };

    addUploadedFile(newFile);

    // Reset form
    setSelectedLevel("");
    setSelectedCourse("");
    setSelectedFile(null);
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleContinue = () => {
    if (registrationState.uploadedFiles.length === 0) {
      alert("Veuillez uploader au moins un fichier avant de continuer");
      return;
    }
    goToNextStep();
    navigate("/admin/step3");
  };

  const steps = [
    { title: "Année scolaire", description: "Créer l'année" },
    { title: "Fichiers", description: "Upload étudiants" },
    { title: "Dates", description: "Période inscription" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => {
            goToPreviousStep();
            navigate("/admin/step1");
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Configuration de l'inscription</h1>
        <div></div>
      </div>

      <RegistrationStepper
        currentStep={registrationState.currentStep}
        steps={steps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Étape 2: Upload des fichiers
            </CardTitle>
            <CardDescription>
              Uploadez les listes d'étudiants admis par niveau et parcours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Format requis:</strong> Les fichiers doivent contenir
                les colonnes suivantes:
                <br />• Nom • Prénom • Email • Numéro d'admission
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <Label htmlFor="level">Niveau</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="course">Parcours</Label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                  disabled={!selectedLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un parcours" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedLevelData?.courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="file">Fichier (.xlsx, .csv)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileSelect}
                />
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Fichier sélectionné: {selectedFile.name}
                  </p>
                )}
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedLevel || !selectedCourse || !selectedFile}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Uploader le fichier
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fichiers uploadés</CardTitle>
            <CardDescription>
              {registrationState.uploadedFiles.length} fichier(s) uploadé(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registrationState.uploadedFiles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun fichier uploadé</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrationState.uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{file.fileName}</p>
                      <p className="text-sm text-gray-600">
                        {file.level} - {file.course}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.uploadDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeUploadedFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          size="lg"
          disabled={registrationState.uploadedFiles.length === 0}
        >
          Continuer
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Step2UploadFiles;
