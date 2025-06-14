import { RegistrationStep } from "@/lib/types";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const steps: RegistrationStep[] = [
    {
      id: 1,
      title: "Niveau",
      description: "Choisir niveau d'étude",
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: 2,
      title: "Parcours",
      description: "Choisir parcours",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: 3,
      title: "Nom",
      description: "Sélectionner nom",
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
    {
      id: 4,
      title: "Informations",
      description: "Données personnelles",
      isCompleted: currentStep > 4,
      isActive: currentStep === 4,
    },
    {
      id: 5,
      title: "Documents",
      description: "Pièces jointes",
      isCompleted: currentStep > 5,
      isActive: currentStep === 5,
    },
    {
      id: 6,
      title: "Confirmation",
      description: "Vérification finale",
      isCompleted: currentStep > 6,
      isActive: currentStep === 6,
    },
  ];

  return (
    <div className="w-full bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${
                    step.isCompleted
                      ? "bg-green-600 border-green-600 text-white"
                      : step.isActive
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                  }
                `}
                >
                  {step.isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium ${
                      step.isActive
                        ? "text-blue-600"
                        : step.isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                  flex-1 h-0.5 mx-2 sm:mx-4 transition-colors
                  ${step.isCompleted ? "bg-green-600" : "bg-gray-300"}
                `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
