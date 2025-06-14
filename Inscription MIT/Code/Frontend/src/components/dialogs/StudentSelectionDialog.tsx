import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Etudiant } from "@/lib/types";

type Props = {
  students: Etudiant[];
  onClose: () => void;
  onConfirm: (selectedStudent: Etudiant) => void;
};

export default function StudentSelectionDialog({ students, onClose, onConfirm }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    const student = students.find((s) => s.id === selectedId);
    if (student) {
      onConfirm(student);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-900">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <span>Sélectionnez votre identité</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {students.length === 0 && (
              <p className="text-gray-700">Aucun étudiant trouvé.</p>
            )}
            <div className="space-y-4">
              {students.map((student) => (
                <label
                  key={student.id}
                  className={`flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedId === student.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="studentSelection"
                    value={student.id}
                    checked={selectedId === student.id}
                    onChange={() => setSelectedId(student.id)}
                    className="mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {student.nom} {student.prenom} ({student.date_naissance})
                    </p>
                    <p className="text-sm text-gray-600">📞 {student.tel}</p>
                    <p className="text-sm text-gray-600">✉️ {student.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
          <div className="flex justify-end space-x-4 p-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button disabled={!selectedId} onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
