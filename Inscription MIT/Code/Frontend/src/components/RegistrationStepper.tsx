import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

const RegistrationStepper: React.FC<StepperProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    {
                      "bg-green-500 text-white": isCompleted,
                      "bg-blue-500 text-white": isCurrent,
                      "bg-gray-200 text-gray-500": isUpcoming,
                    },
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn("text-sm font-medium", {
                      "text-green-600": isCompleted,
                      "text-blue-600": isCurrent,
                      "text-gray-500": isUpcoming,
                    })}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 max-w-24">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn("flex-1 h-0.5 mx-4 transition-all", {
                    "bg-green-500": stepNumber < currentStep,
                    "bg-gray-200": stepNumber >= currentStep,
                  })}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationStepper;
