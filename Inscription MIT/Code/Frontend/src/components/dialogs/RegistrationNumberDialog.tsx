import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAdmittedStudentById } from "@/lib/data";
import { Hash, AlertCircle } from "lucide-react";

interface RegistrationNumberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudentId: string;
  onConfirm: (registrationNumber: string) => void;
  onCancel: () => void;
}

export default function RegistrationNumberDialog({
  open,
  onOpenChange,
  selectedStudentId,
  onConfirm,
  onCancel,
}: RegistrationNumberDialogProps) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [error, setError] = useState("");

  const selectedStudent = getAdmittedStudentById(selectedStudentId);
  const expectedNumber = selectedStudent?.registrationNumber;

  const handleSubmit = () => {
    if (!registrationNumber.trim()) {
      setError("Veuillez saisir votre numéro d'inscription");
      return;
    }

    if (registrationNumber !== expectedNumber) {
      setError(
        "Le numéro d'inscription ne correspond pas à celui attendu pour cet étudiant",
      );
      return;
    }

    onConfirm(registrationNumber);
    setRegistrationNumber("");
    setError("");
  };

  const handleCancel = () => {
    setRegistrationNumber("");
    setError("");
    onCancel();
  };

  const handleInputChange = (value: string) => {
    setRegistrationNumber(value);
    if (error) {
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Hash className="h-5 w-5 text-blue-600" />
            <span>Confirmation d'identité</span>
          </DialogTitle>
          <DialogDescription>
            Pour continuer votre inscription, veuillez saisir votre numéro
            d'inscription correspondant au nom sélectionné.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {selectedStudent && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Nom sélectionné :</span>{" "}
                {selectedStudent.name}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="registration-number">Numéro d'inscription *</Label>
            <Input
              id="registration-number"
              placeholder="Ex: 2024001"
              value={registrationNumber}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              className={error ? "border-red-500" : ""}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-gray-500">
            <p>
              💡 <strong>Astuce :</strong> Votre numéro d'inscription se trouve
              sur votre document d'admission.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Retour
          </Button>
          <Button onClick={handleSubmit}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
