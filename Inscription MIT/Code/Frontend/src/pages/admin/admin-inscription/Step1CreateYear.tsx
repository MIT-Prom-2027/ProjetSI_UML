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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useNavigate } from "react-router-dom";
import RegistrationStepper from "@/components/RegistrationStepper";
import { SchoolYear } from "@/types/registration";

const formSchema = z
  .object({
    startYear: z
      .string()
      .min(4, "Année de début requise")
      .regex(/^\d{4}$/, "Format: YYYY"),
    endYear: z
      .string()
      .min(4, "Année de fin requise")
      .regex(/^\d{4}$/, "Format: YYYY"),
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().min(1, "Date de fin requise"),
  })
  .refine(
    (data) => {
      const start = parseInt(data.startYear);
      const end = parseInt(data.endYear);
      return end === start + 1;
    },
    {
      message: "L'année de fin doit être l'année suivante",
      path: ["endYear"],
    },
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: "La date de fin doit être après la date de début",
      path: ["endDate"],
    },
  );

const Step1CreateYear: React.FC = () => {
  const { setSchoolYear, goToNextStep, registrationState } = useRegistration();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startYear: new Date().getFullYear().toString(),
      endYear: (new Date().getFullYear() + 1).toString(),
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const schoolYear: SchoolYear = {
      id: `${values.startYear}-${values.endYear}`,
      startYear: parseInt(values.startYear),
      endYear: parseInt(values.endYear),
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
    };

    setSchoolYear(schoolYear);
    goToNextStep();
    navigate("/admin/step2");
  };

  const steps = [
    { title: "Année scolaire", description: "Créer l'année" },
    { title: "Fichiers", description: "Upload étudiants" },
    { title: "Dates", description: "Période inscription" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/start-registration")}
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Étape 1: Créer l'année scolaire
          </CardTitle>
          <CardDescription>
            Définissez la nouvelle année académique et ses dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année de début</FormLabel>
                      <FormControl>
                        <Input placeholder="2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année de fin</FormLabel>
                      <FormControl>
                        <Input placeholder="2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début de l'année</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de fin de l'année</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Information</h4>
                <p className="text-sm text-blue-700">
                  Cette année scolaire sera utilisée pour toutes les
                  inscriptions. Assurez-vous que les dates correspondent bien au
                  calendrier académique officiel.
                </p>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Continuer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step1CreateYear;
