import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Etudiant, RegistrationFormData } from "@/lib/types";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import get from "@/lib/get";

interface StepFourProps {
  formData: RegistrationFormData;
  onUpdateFormData: (data: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepFour({
  formData,
  onUpdateFormData,
  onNext,
  onBack,
}: StepFourProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [country, setCountry] = useState<{'name':string, 'value':string}[]>([]);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_COUNTRY_API}`  
        const data = await get(url);
        setCountry(data.country );
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLevel();
  }, []);

  console.log(country);
  

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.etudiantInfo.nom?.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.etudiantInfo.prenom?.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.etudiantInfo.email?.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.etudiantInfo.email))
      newErrors.email = "Format d'email invalide";
    if (!formData.etudiantInfo.tel?.trim())
      newErrors.telephone = "Le téléphone est requis";
    if (!formData.etudiantInfo.num_inscription?.trim())
      newErrors.numInscription = "Le numéro d'inscription est requis";
    if (!formData.etudiantInfo.date_naissance?.trim())
      newErrors.dateNaissance = "La date de naissance est requise";
    if (!formData.etudiantInfo.lieu_naissance?.trim())
      newErrors.lieuNaissance = "Le lieu de naissance est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData.etudiantInfo);      
      onNext();
    }
  };

  const handleInputChange = (
    field: keyof Etudiant,
    value: string,
  ) => {
    onUpdateFormData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations personnelles
        </h2>
        <p className="text-gray-600">
          Veuillez remplir vos informations personnelles
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-blue-600" />
            <CardTitle>Formulaire d'inscription</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.etudiantInfo.nom || ""}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className={errors.nom ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.nom!=""}
              />
              {errors.nom && (
                <p className="text-sm text-red-500">{errors.nom}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.etudiantInfo.prenom || ""}
                onChange={(e) => handleInputChange("prenom", e.target.value)}
                className={errors.prenom ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.prenom!=""}                
              />
              {errors.prenom && (
                <p className="text-sm text-red-500">{errors.prenom}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.etudiantInfo.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              value={formData.etudiantInfo.tel || ""}
              onChange={(e) => handleInputChange("tel", e.target.value)}
              className={errors.telephone ? "border-red-500" : ""}
            />
            {errors.telephone && (
              <p className="text-sm text-red-500">{errors.telephone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cin">CIN</Label>
            <Input
              id="cin"
              value={formData.etudiantInfo.cin || ""}
              onChange={(e) =>
                handleInputChange("cin", e.target.value)
              }
              className={errors.cin ? "border-red-500" : ""}
              disabled={formData.etudiantInfo.cin!=""}              
            />
            {errors.cin && (
              <p className="text-sm text-red-500">{errors.cin}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numInscription">Numéro d'inscription *</Label>
              <Input
                id="numInscription"
                value={formData.etudiantInfo.num_inscription || ""}
                onChange={(e) =>
                  handleInputChange("num_inscription", e.target.value)
                }
                className={errors.numInscription ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.num_inscription!=""}                
              />
              {errors.numInscription && (
                <p className="text-sm text-red-500">{errors.numInscription}</p>
              )}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="annee_bacc">Annee du bacc</Label>
              <Input
                id="annee_bacc"
                type="Number"
                value={formData.etudiantInfo.annee_bacc || ""}
                onChange={(e) => handleInputChange("annee_bacc", e.target.value)}
                className={errors.annee_bacc ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.annee_bacc!=""}                
              />
              {errors.prenom && (
                <p className="text-sm text-red-500">{errors.annee_bacc}</p>
              )}
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="serie">Serie</Label>
              <Input
                id="serie"
                value={formData.etudiantInfo.serie || ""}
                onChange={(e) => handleInputChange("serie", e.target.value)}
                className={errors.serie ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.serie!=""}                
              />
              {errors.prenom && (
                <p className="text-sm text-red-500">{errors.serie}</p>
              )}
            </div>            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateNaissance">Date de naissance *</Label>
              <Input
                id="dateNaissance"
                type="date"
                value={formData.etudiantInfo.date_naissance || ""}
                onChange={(e) =>
                  handleInputChange("date_naissance", e.target.value)
                }
                className={errors.dateNaissance ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.date_naissance!=""}                
              />
              {errors.dateNaissance && (
                <p className="text-sm text-red-500">{errors.dateNaissance}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lieuNaissance">Lieu de naissance *</Label>
              <Input
                id="lieuNaissance"
                value={formData.etudiantInfo.lieu_naissance || ""}
                onChange={(e) =>
                  handleInputChange("lieu_naissance", e.target.value)
                }
                className={errors.lieuNaissance ? "border-red-500" : ""}
                disabled={formData.etudiantInfo.lieu_naissance!=""}                
              />
              {errors.lieuNaissance && (
                <p className="text-sm text-red-500">{errors.lieuNaissance}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresse">Adresse *</Label>
            <Input
              id="adresse"
              value={formData.etudiantInfo.adresse || ""}
              onChange={(e) =>
                handleInputChange("adresse", e.target.value)
              }
              className={errors.adresse ? "border-red-500" : ""}
            />
            {errors.adresse && (
              <p className="text-sm text-red-500">{errors.adresse}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select
                value={formData.etudiantInfo.genre || ""}
                onValueChange={(value) => handleInputChange("genre", value)}
                disabled={formData.etudiantInfo.genre!=null}                              
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un genre" />
                </SelectTrigger>
                <SelectContent
                  className={errors.genre ? "border-red-500" : ""}                
                >
                  <SelectItem value="M">Homme</SelectItem>
                  <SelectItem value="F">Femme</SelectItem>
                  <SelectItem value="O">Autre</SelectItem>
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="text-sm text-red-500">{errors.genre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalite">Nationalite *</Label>
              <Select
                value={formData.etudiantInfo.nationalite || ""}
                onValueChange={(value) => handleInputChange("nationalite", value)}
                disabled={formData.etudiantInfo.nationalite!=""}                              
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un genre" />
                </SelectTrigger>
                <SelectContent
                  className={errors.nationalite ? "border-red-500" : ""}  
                >
                  {country.map((elt, index) => (
                    <SelectItem key={index} value={elt.name}>
                      {elt.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.nationalite && (
                <p className="text-sm text-red-500">{errors.nationalite}</p>
              )}
            </div>
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4 pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          Retour
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Continuer
        </Button>
      </div>
    </div>
  );
}
