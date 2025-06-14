import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentUpload } from "@/lib/types";
import { Upload, FileText, Check, X } from "lucide-react";

interface StepFiveProps {
  documents: DocumentUpload;
  onUpdateDocuments: (docs: DocumentUpload) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepFive({
  documents,
  onUpdateDocuments,
  onNext,
  onBack,
}: StepFiveProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const requiredDocuments = [
    { key: "photo", label: "Photo d'identité", accept: "image/*" },
    {
      key: "cin_recto",
      label: "Carte d'identité nationale Recto(CIN)",
      accept: "image/*,application/pdf",
    },
    {
      key: "cin_verso",
      label: "Carte d'identité nationale Verso(CIN)",
      accept: "image/*,application/pdf",
    },
    {
      key: "residence",
      label: "Justificatif de résidence",
      accept: "image/*,application/pdf",
    },
    {
      key: "releve_de_note",
      label: "Justificatif de relevé de note",
      accept: "image/*,application/pdf",
    },
    {
      key: "recu_faculte",
      label: "Document du numéro d'inscription",
      accept: "image/*,application/pdf",
    },
  ];

  const validateDocuments = () => {
    const newErrors: Record<string, string> = {};

    requiredDocuments.forEach((doc) => {
      if (!documents[doc.key as keyof DocumentUpload]) {
        newErrors[doc.key] = `${doc.label} est requis`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (key: keyof DocumentUpload, file: File | null) => {
    onUpdateDocuments({
      ...documents,
      [key]: file,
    });

    // Update preview
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => ({ ...prev, [key]: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews((prev) => ({ ...prev, [key]: "non-image" }));
      }
    } else {
      setPreviews((prev) => ({ ...prev, [key]: "" }));
    }

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleRemoveFile = (key: keyof DocumentUpload) => {
    onUpdateDocuments({
      ...documents,
      [key]: null,
    });
    setPreviews((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = () => {
    if (validateDocuments()) {
      onNext();
    }
  };

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
          Pièces jointes
        </h2>
        <p className="text-gray-600">
          Téléchargez les documents requis pour votre inscription
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Upload className="h-6 w-6 text-blue-600" />
            <CardTitle>Documents à fournir</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {requiredDocuments.map((doc) => (
            <div key={doc.key} className="space-y-2">
              <Label htmlFor={doc.key} className="text-sm font-medium">
                {doc.label} *
              </Label>
              <div className="flex items-center space-x-3">
                <Input
                  id={doc.key}
                  type="file"
                  accept={doc.accept}
                  capture = {doc.key=="photo"?"environment":false}
                  onChange={(e) =>
                    handleFileChange(
                      doc.key as keyof DocumentUpload,
                      e.target.files?.[0] || null,
                    )
                  }
                  className={`flex-1 ${errors[doc.key] ? "border-red-500" : ""}`}
                />
                {documents[doc.key as keyof DocumentUpload] && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Téléchargé</span>
                  </div>
                )}
              </div>
              {errors[doc.key] && (
                <p className="text-sm text-red-500">{errors[doc.key]}</p>
              )}
              {previews[doc.key] && (
                <div className="relative max-w-xs">
                  {previews[doc.key].startsWith("data:image/") ? (
                    <img
                      src={previews[doc.key]}
                      alt={`${doc.label} preview`}
                      className="w-full h-auto max-h-40 object-contain rounded-md"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FileText className="h-6 w-6" />
                      <span>{name(doc.key)}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveFile(doc.key as keyof DocumentUpload)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    title="Supprimer le fichier"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}      
            </div>            
          ))}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Instructions :</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Les fichiers doivent être au format JPG, PNG ou PDF</li>
              <li>• Taille maximale : 5 MB par fichier</li>
              <li>• Assurez-vous que les documents sont lisibles</li>
              <li>• La photo doit être récente et en couleur</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4 pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Continuer vers la confirmation
        </Button>
      </div>
    </div>
  );
}