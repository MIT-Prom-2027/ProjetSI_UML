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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ValidationChecks } from "@/lib/types";
import { AlertCircle } from "lucide-react";

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  validationChecks: ValidationChecks;
  onConfirmReject: (reasons: string[]) => void;
  studentName: string;
}

const REJECTION_CATEGORIES = [
  {
    id: "personalInfo" as keyof ValidationChecks,
    label: "Informations personnelles",
    defaultReasons: [
      "Nom ou prénom incorrect",
      "Date de naissance incorrecte",
      "Lieu de naissance incorrect",
      "Informations de contact invalides",
    ],
  },
  {
    id: "documents" as keyof ValidationChecks,
    label: "Documents",
    defaultReasons: [
      "Photo d'identité manquante ou non conforme",
      "Carte d'identité manquante ou illisible",
      "Justificatif de résidence manquant",
      "Document du numéro d'inscription manquant",
    ],
  },
  {
    id: "eligibility" as keyof ValidationChecks,
    label: "Critères d'admissibilité",
    defaultReasons: [
      "Ne figure pas sur la liste des admis",
      "Niveau d'étude non conforme",
      "Parcours non conforme",
      "Conditions d'admission non remplies",
    ],
  },
  {
    id: "payment" as keyof ValidationChecks,
    label: "Frais d'inscription",
    defaultReasons: [
      "Frais d'inscription non payés",
      "Justificatif de paiement manquant",
      "Montant incorrect",
    ],
  },
];

export default function RejectionDialog({
  open,
  onOpenChange,
  validationChecks,
  onConfirmReject,
  studentName,
}: RejectionDialogProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState("");

  // Get unchecked categories
  const uncheckedCategories = REJECTION_CATEGORIES.filter(
    (category) => !validationChecks[category.id],
  );

  const handleReasonToggle = (reason: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons((prev) => [...prev, reason]);
    } else {
      setSelectedReasons((prev) => prev.filter((r) => r !== reason));
    }
  };

  const handleConfirm = () => {
    const allReasons = [...selectedReasons];
    if (customReason.trim()) {
      allReasons.push(customReason.trim());
    }
    onConfirmReject(allReasons);
    setSelectedReasons([]);
    setCustomReason("");
  };

  const handleCancel = () => {
    setSelectedReasons([]);
    setCustomReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Rejeter l'inscription</span>
          </DialogTitle>
          <DialogDescription>
            Vous êtes sur le point de rejeter l'inscription de{" "}
            <span className="font-semibold">{studentName}</span>. Veuillez
            sélectionner les raisons du rejet parmi les catégories non validées.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {uncheckedCategories.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">
                Toutes les catégories sont validées. Vous ne devriez pas rejeter
                cette inscription.
              </p>
            </div>
          ) : (
            <>
              {uncheckedCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <h4 className="font-medium text-red-600">{category.label}</h4>
                  <div className="space-y-2 pl-4">
                    {category.defaultReasons.map((reason) => (
                      <div key={reason} className="flex items-center space-x-2">
                        <Checkbox
                          id={`reason-${reason}`}
                          checked={selectedReasons.includes(reason)}
                          onCheckedChange={(checked) =>
                            handleReasonToggle(reason, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`reason-${reason}`}
                          className="text-sm cursor-pointer"
                        >
                          {reason}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="custom-reason">Autre raison (optionnel)</Label>
                <Textarea
                  id="custom-reason"
                  placeholder="Précisez une autre raison..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={selectedReasons.length === 0 && !customReason.trim()}
          >
            Confirmer le rejet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
