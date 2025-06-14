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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  FileText,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useNavigate } from "react-router-dom";

const AdminInscriptionInfo: React.FC = () => {
  const { registrationState, endRegistration, updateRegistrationEndDate } =
    useRegistration();
  const navigate = useNavigate();
  const [newEndDate, setNewEndDate] = useState("");
  const [isEndDateDialogOpen, setIsEndDateDialogOpen] = useState(false);

  const isRegistrationActive =
    registrationState.isActive && registrationState.currentStep === 4;

  const handleEndRegistration = () => {
    if (window.confirm("Êtes-vous sûr de vouloir fermer les inscriptions ?")) {
      endRegistration();
    }
  };

  const handleUpdateEndDate = () => {
    if (newEndDate) {
      updateRegistrationEndDate(new Date(newEndDate));
      setIsEndDateDialogOpen(false);
      setNewEndDate("");
    }
  };

  return (
    <div className="space-y-6">
      {isRegistrationActive && (
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Inscription information
        </h2>      
      )}
      {/* Current Registration Info */}
      {isRegistrationActive && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Inscription en cours
            </CardTitle>
            <CardDescription>
              Gérer la période d'inscription actuelle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {registrationState.schoolYear && (
              <div>
                <Label className="text-sm font-medium">Année scolaire</Label>
                <p className="text-lg">
                  {registrationState.schoolYear.date_debut?.toLocaleDateString()} -{" "}
                  {registrationState.schoolYear.date_fin?.toLocaleDateString()}
                </p>
              </div>
            )}

            {registrationState.registrationPeriod && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date de début</Label>
                  <p>
                    {new Date(
                      registrationState.registrationPeriod.date_debut,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date de fin</Label>
                  <p>
                    {registrationState.registrationPeriod.date_fin
                      ? new Date(
                          registrationState.registrationPeriod.date_fin,
                        ).toLocaleDateString("fr-FR")
                      : "Non définie"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Dialog
                open={isEndDateDialogOpen}
                onOpenChange={setIsEndDateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Modifier date de fin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Modifier la date de fin d'inscription
                    </DialogTitle>
                    <DialogDescription>
                      Définir ou modifier la date limite d'inscription
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="endDate">Date de fin</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newEndDate}
                        onChange={(e) => setNewEndDate(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEndDateDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleUpdateEndDate}
                        disabled={!newEndDate}
                      >
                        Sauvegarder
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="destructive" onClick={handleEndRegistration}>
                <XCircle className="w-4 h-4 mr-2" />
                Fermer les inscriptions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Files */}
      {registrationState.uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fichiers uploadés</CardTitle>
            <CardDescription>
              Liste des fichiers d'étudiants admis par niveau
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {registrationState.uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{file.fileName}</p>
                    <p className="text-sm text-gray-600">
                      {file.level} - {file.course}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(file.uploadDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminInscriptionInfo;
