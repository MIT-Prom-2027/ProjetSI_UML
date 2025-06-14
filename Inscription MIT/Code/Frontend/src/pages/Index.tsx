import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, BookOpen, XCircle, CheckCircle } from "lucide-react";
import Logo from "/logo.jpg";
import { UNIVERSITY_INFO } from "@/lib/data";
import { useRegistration } from "@/context/RegistrationContext";

export default function Index() {
  const { registrationState, endRegistration, updateRegistrationEndDate } =
    useRegistration();
  const isRegistrationActive = registrationState.isActive;  

  const stat = {
    title: "Statut inscription",
    value: isRegistrationActive ? "Ouverte" : "Fermée",
    icon: isRegistrationActive ? CheckCircle : XCircle,
    color: isRegistrationActive ? "text-green-600" : "text-red-600",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={Logo} className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {UNIVERSITY_INFO.name}
              </h1>
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Espace Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Bienvenue à l'{UNIVERSITY_INFO.name}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {UNIVERSITY_INFO.description}
          </p>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
              disabled={!isRegistrationActive}              
              onClick={(e) => {
                e.preventDefault();
                if (isRegistrationActive) {
                  window.location.href = "/inscription";
                }
              }}
            >
              Commencer mon inscription
            </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Excellence Académique</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Des programmes d'études rigoureux conçus pour former les leaders
                de demain
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Innovation & Recherche</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Laboratoires de recherche de pointe et projets innovants
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Reconnaissance Internationale</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Diplômes reconnus à l'échelle nationale et internationale
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 w-[80%] m-auto">

          {/* Status Inscription */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-center mr-[4vw]">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
              <CardContent className="p-6" style={{ backgroundColor: stat.color }}>
                <CardDescription className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                  {stat.value}
                </CardDescription>
              </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                Informations de Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">{UNIVERSITY_INFO.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600">{UNIVERSITY_INFO.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">{UNIVERSITY_INFO.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 {UNIVERSITY_INFO.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
