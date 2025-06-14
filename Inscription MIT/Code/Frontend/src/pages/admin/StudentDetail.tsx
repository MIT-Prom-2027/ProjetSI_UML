import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_STUDENTS, getLevelById, getCourseById } from "@/lib/data";
import RejectionDialog from "@/components/dialogs/RejectionDialog";
import {
  ArrowLeft,
  Check,
  X,
  Download,
  User,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { Inscription } from "@/lib/types";
import get from "@/lib/get";
import { post } from "@/lib/post";

export default function StudentDetail(
  student: Inscription
) {
  // const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [validationChecks, setValidationChecks] = useState({
    personalInfo: false,
    documents: false,
    eligibility: false,
    payment: false,
  });
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  // const student = MOCK_STUDENTS.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">Étudiant non trouvé</p>
            <Button onClick={() => navigate("/admin")} className="mt-4">
              Retour au dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const level = getLevelById(student.levelId.niv);
  const course = getCourseById(student.courseId.parcour);

  const handleValidationChange = (
    field: keyof typeof validationChecks,
    checked: boolean,
  ) => {
    setValidationChecks((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const allValidationChecked = Object.values(validationChecks).every(Boolean);

  const handleValidate = async() => {
    // In a real app, this would make an API call
    const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ADMIN_API}${import.meta.env.VITE_INSCRIPTION_ID}${student.id_inscription}${import.meta.env.VITE_INSCRIPTION_A_VALIDER}`
    let isDone = await get(url);
    if(isDone){
      console.log("Validating student:", student.id_inscription);
      navigate("/admin");
    }
    else{
      alert("Erreur")
    }
  };

  const handleReject = () => {
    setShowRejectionDialog(true);
  };

  const handleConfirmReject = async (reasons: string[]) => {
    const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ADMIN_API}${import.meta.env.VITE_INSCRIPTION_ID}${student.id_inscription}${import.meta.env.VITE_INSCRIPTION_A_REJETER}`
    let isDone = await post(url,reasons);
    if(isDone){
      console.log("Validating student:", student.id_inscription);
      setShowRejectionDialog(false);
      navigate("/admin");
    }
    else{
      alert("Erreur")
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            En attente
          </Badge>
        );
      case "validated":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Validé
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejeté
          </Badge>
        );
      default:
        return null;
    }
  };

  const validationItems = [
    {
      id: "personalInfo",
      label: "Informations personnelles complètes et correctes",
      checked: validationChecks.personalInfo,
    },
    {
      id: "documents",
      label: "Tous les documents requis fournis et valides",
      checked: validationChecks.documents,
    },
    {
      id: "eligibility",
      label: "Critères d'admissibilité respectés",
      checked: validationChecks.eligibility,
    },
    {
      id: "payment",
      label: "Frais d'inscription payés",
      checked: validationChecks.payment,
    },
  ];

  const documentsList = [
    { key: "photo", label: "Photo d'identité", available: true },
    { key: "cin", label: "Carte d'identité nationale", available: true },
    { key: "residence", label: "Justificatif de résidence", available: true },
    {
      key: "numInscriptionDoc",
      label: "Document du numéro d'inscription",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour au dashboard</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <User className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Détail de l'inscription
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {student.etudiantInfo.prenom[0]}
                        {student.etudiantInfo.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {student.etudiantInfo.prenom} {student.etudiantInfo.nom}
                      </h2>
                      <p className="text-gray-600">{student.etudiantInfo.num_inscription}</p>
                    </div>
                  </CardTitle>
                  {getStatusBadge(student.statut)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{student.etudiantInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{student.etudiantInfo.tel}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {new Date(student.etudiantInfo.date_naissance).toLocaleDateString(
                        "fr-FR",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{student.etudiantInfo.lieu_naissance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span>Informations académiques</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Niveau d'étude
                    </p>
                    <p className="text-gray-900">{level?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Parcours
                    </p>
                    <p className="text-gray-900">{course?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Date d'inscription
                    </p>
                    <p className="text-gray-900">
                      {student.date_soumission.toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Numéro d'inscription
                    </p>
                    <p className="text-gray-900">{student.etudiantInfo.num_inscription}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span>Documents fournis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentsList.map((doc) => (
                    <div
                      key={doc.key}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{doc.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.available ? (
                          <>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Fourni
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Télécharger
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            Manquant
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Validation Checklist (only for pending status) */}
            {student.statut === 'en attente' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Validation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {validationItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={(checked) =>
                            handleValidationChange(
                              item.id as keyof typeof validationChecks,
                              checked as boolean,
                            )
                          }
                        />
                        <label
                          htmlFor={item.id}
                          className="text-sm leading-tight cursor-pointer"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!allValidationChecked}
                      onClick={handleValidate}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Valider l'inscription
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleReject}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Rejeter l'inscription
                    </Button>
                  </div>

                  {!allValidationChecked && (
                    <p className="text-xs text-gray-500">
                      Cochez tous les éléments pour pouvoir valider
                      l'inscription.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler l'étudiant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Exporter le dossier
                </Button>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Inscription soumise</p>
                      <p className="text-xs text-gray-500">
                        {student.date_soumission.toLocaleDateString("fr-FR")} à{" "}
                        {student.date_soumission.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Rejection Dialog */}
      <RejectionDialog
        open={showRejectionDialog}
        onOpenChange={setShowRejectionDialog}
        validationChecks={validationChecks}
        onConfirmReject={handleConfirmReject}
        studentName={`${student?.etudiantInfo.prenom} ${student?.etudiantInfo.nom}`}
      />
    </div>
  );
}
