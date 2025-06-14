import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Mail, RefreshCw } from "lucide-react";
import { UNIVERSITY_INFO } from "@/lib/data";

export default function RegistrationError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Inscription Universitaire
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Échec de l'inscription
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une erreur s'est produite lors de la soumission de votre dossier. Veuillez vérifier vos informations et réessayer.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Error Message */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Problème détecté</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                Nous n'avons pas pu enregistrer votre demande d'inscription. Cela peut être dû à des informations incomplètes, des documents manquants ou un problème technique.
              </p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span>Que faire maintenant ?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Vérifiez vos informations
                  </h4>
                  <p className="text-sm text-gray-600">
                    Assurez-vous que tous les champs obligatoires sont remplis et que les documents requis sont correctement téléchargés.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Réessayez de soumettre
                  </h4>
                  <p className="text-sm text-gray-600">
                    Retournez au formulaire d'inscription et soumettez à nouveau votre dossier après avoir corrigé les erreurs.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Contactez le support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Si le problème persiste, contactez notre équipe pour une assistance immédiate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-600" />
                <span>Besoin d'aide ?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">
                Pour toute question ou assistance concernant votre inscription, contactez-nous :
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email :</strong> {UNIVERSITY_INFO.email}
                </p>
                <p>
                  <strong>Téléphone :</strong> {UNIVERSITY_INFO.phone}
                </p>
                <p>
                  <strong>Adresse :</strong> {UNIVERSITY_INFO.address}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <Link to="/inscription">
              <Button
                size="lg"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Réessayer</span>
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Retour à l'accueil</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2024 {UNIVERSITY_INFO.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}