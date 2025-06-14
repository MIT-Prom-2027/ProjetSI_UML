import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Upload, Clock, ArrowRight } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useNavigate } from "react-router-dom";

const StartRegistration: React.FC = () => {
  const { startRegistrationProcess } = useRegistration();
  const navigate = useNavigate();

  const handleStartRegistration = () => {
    startRegistrationProcess();
    navigate("/admin/step1");
  };

  const steps = [
    {
      icon: Calendar,
      title: "Créer l'année scolaire",
      description:
        "Définir la nouvelle année académique avec les dates de début et fin",
      details: [
        "Saisir l'année de début et de fin",
        "Définir les dates du calendrier académique",
        "Valider les informations",
      ],
    },
    {
      icon: Upload,
      title: "Uploader les fichiers",
      description:
        "Importer les listes d'étudiants admis par niveau et parcours",
      details: [
        "Formats acceptés: .xlsx, .csv",
        "Un fichier par niveau et parcours",
        "Vérification automatique des colonnes",
      ],
    },
    {
      icon: Clock,
      title: "Définir les dates d'inscription",
      description: "Fixer la période d'ouverture des inscriptions",
      details: [
        "Date de début d'inscription",
        "Date de fin (optionnelle)",
        "Activation automatique du système",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Démarrer une nouvelle inscription
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Suivez ces 3 étapes pour configurer et lancer les inscriptions
          étudiantes
        </p>
      </div>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    Étape {index + 1}: {step.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Prêt à commencer ?
            </h3>
            <p className="text-blue-700 mb-6">
              Une fois démarrée, la configuration se fera étape par étape. Vous
              pourrez revenir en arrière si nécessaire.
            </p>
            <Button
              onClick={handleStartRegistration}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Démarrer l'inscription
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>
          Besoin d'aide ? Consultez le guide d'administration ou contactez le
          support technique.
        </p>
      </div>
    </div>
  );
};

export default StartRegistration;
