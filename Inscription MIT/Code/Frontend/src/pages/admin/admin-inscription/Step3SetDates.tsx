import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Clock,
  ArrowLeft,
  CheckCircle,
  Calendar,
  Users,
  FileText,
} from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useNavigate } from "react-router-dom";
import RegistrationStepper from "@/components/RegistrationStepper";
import { RegistrationPeriod } from "@/types/registration";

const formSchema = z
  .object({
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        return endDate > startDate;
      }
      return true;
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["endDate"],
    },
  );

const Step3SetDates: React.FC = () => {
  const {
    setRegistrationPeriod,
    completeRegistrationSetup,
    goToPreviousStep,
    registrationState,
  } = useRegistration();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const period: RegistrationPeriod = {
      startDate: new Date(values.startDate),
      endDate: values.endDate ? new Date(values.endDate) : undefined,
    };

    setRegistrationPeriod(period);
    completeRegistrationSetup();
    navigate("/admin");
  };

  const steps = [
    { title: "Année scolaire", description: "Créer l'année" },
    { title: "Fichiers", description: "Upload étudiants" },
    { title: "Dates", description: "Période inscription" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => {
            goToPreviousStep();
            navigate("/admin/step2");
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Configuration de l'inscription</h1>
        <div></div>
      </div>

      <RegistrationStepper
        currentStep={registrationState.currentStep}
        steps={steps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Étape 3: Définir les dates d'inscription
            </CardTitle>
            <CardDescription>
              Configurez la période pendant laquelle les étudiants pourront
              s'inscrire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début d'inscription</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        À partir de cette date, les étudiants pourront commencer
                        leur inscription
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date de fin d'inscription (optionnel)
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Laissez vide pour ne pas fixer de date limite. Vous
                        pourrez la définir plus tard depuis le tableau de bord
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">
                    Finalisation
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Une fois validée, cette configuration activera immédiatement
                    le système d'inscription.
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Les étudiants pourront accéder à la plateforme</li>
                    <li>• L'interface d'administration sera mise à jour</li>
                    <li>
                      • Vous pourrez modifier les dates depuis le tableau de
                      bord
                    </li>
                  </ul>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activer les inscriptions
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Récapitulatif de la configuration</CardTitle>
            <CardDescription>
              Vérifiez les informations avant d'activer les inscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* School Year Summary */}
            {registrationState.schoolYear && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                </div>
                <div>
                  <h4 className="font-medium">Année scolaire</h4>
                  <p className="text-sm text-gray-600">
                    {registrationState.schoolYear.startYear} -{" "}
                    {registrationState.schoolYear.endYear}
                  </p>
                  <p className="text-xs text-gray-500">
                    Du{" "}
                    {new Date(
                      registrationState.schoolYear.startDate,
                    ).toLocaleDateString("fr-FR")}
                    au{" "}
                    {new Date(
                      registrationState.schoolYear.endDate,
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            )}

            {/* Files Summary */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium">Fichiers uploadés</h4>
                <p className="text-sm text-gray-600">
                  {registrationState.uploadedFiles.length} fichier(s)
                  d'étudiants admis
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  {registrationState.uploadedFiles.map((file, index) => (
                    <div key={file.id}>
                      {file.level} - {file.course}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Students Summary */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Users className="w-5 h-5 text-purple-600 mt-1" />
              </div>
              <div>
                <h4 className="font-medium">Étudiants</h4>
                <p className="text-sm text-gray-600">
                  Prêts pour l'inscription
                </p>
                <p className="text-xs text-gray-500">
                  Les étudiants pourront vérifier leur admission et s'inscrire
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Actions possibles après activation
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Modifier les dates d'inscription</li>
                <li>• Ajouter de nouveaux fichiers d'étudiants</li>
                <li>• Consulter les statistiques d'inscription</li>
                <li>• Fermer les inscriptions quand nécessaire</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step3SetDates;
