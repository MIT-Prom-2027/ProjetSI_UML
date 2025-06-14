import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RegistrationFormData, DocumentUpload } from "@/lib/types";
import {
  getLevelById,
  getCourseById,
  getAdmittedStudentById,
} from "@/lib/data";
import { CheckCircle, User, FileText, Calendar } from "lucide-react";

interface ConfirmationProps {
  formData: RegistrationFormData;
  documents: DocumentUpload;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Confirmation({
  formData,
  documents,
  onSubmit,
  onBack,
}: ConfirmationProps) {
  const level = formData.levelId.niv;
  const course = formData.courseId.parcour;
  const admittedStudent = formData.admittedStudentId;

  const documentList = [
    { key: "photo", label: "Photo d'identité" },
    { key: "cin_recto", label: "Carte d'identité nationale Recto" },
    { key: "cin_verso", label: "Carte d'identité nationale Verso" },    
    { key: "residence", label: "Justificatif de résidence" },
    { key: "numInscriptionDoc", label: "Document du numéro d'inscription" },
  ];

  const name = (key:string)=>{                    
    const d = documents[key as keyof DocumentUpload]
    if (d instanceof File) {
      return <>{d.name}</>
    } else {
      return <>d</>
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirmation de votre inscription
        </h2>
        <p className="text-gray-600">
          Vérifiez vos informations avant de finaliser votre inscription
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Informations académiques</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Niveau d'étude
                </p>
                <p className="text-gray-900">{level}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Parcours</p>
                <p className="text-gray-900">{course}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Nom sélectionné
                </p>
                <p className="text-gray-900">{admittedStudent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Informations personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nom</p>
                <p className="text-gray-900">{formData.etudiantInfo.nom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Prénom</p>
                <p className="text-gray-900">{formData.etudiantInfo.prenom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nationalite</p>
                <p className="text-gray-900">{formData.etudiantInfo.nationalite}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Genre</p>
                <p className="text-gray-900">{formData.etudiantInfo.genre}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{formData.etudiantInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                <p className="text-gray-900">{formData.etudiantInfo.tel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Numéro d'inscription
                </p>
                <p className="text-gray-900">{formData.etudiantInfo.num_inscription}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Serie du bacc</p>
                <p className="text-gray-900">{formData.etudiantInfo.serie}</p>
              </div>              
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Date de naissance
                </p>
                <p className="text-gray-900">
                  {new Date(formData.etudiantInfo.date_naissance).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">
                  Lieu de naissance
                </p>
                <p className="text-gray-900">{formData.etudiantInfo.lieu_naissance}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Adresse</p>
                <p className="text-gray-900">{formData.etudiantInfo.adresse}</p>
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
            <div className="space-y-2">
              {documentList.map((doc) => (
                <div
                  key={doc.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{doc.label}</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                    <span>{name(doc.key)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Important</p>
                <p className="text-sm text-yellow-700">
                  Une fois votre inscription soumise, vous recevrez un email de
                  confirmation. Votre dossier sera examiné par l'administration
                  et vous serez notifié du statut de votre inscription dans les
                  5 jours ouvrables.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center space-x-4 pt-6">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button
          onClick={onSubmit}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          Finaliser mon inscription
        </Button>
      </div>
    </div>
  );
}
