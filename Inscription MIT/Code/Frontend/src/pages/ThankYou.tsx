import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Mail, Clock } from "lucide-react";
import { UNIVERSITY_INFO } from "@/lib/data";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Inscription Universitaire
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Inscription reussie !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre inscription a été soumise avec succès. Nous avons bien reçu
            votre dossier.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Message */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Inscription réussie</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Votre demande d'inscription a été enregistrée dans notre
                système. Un numéro de référence unique vous sera envoyé par
                email.
              </p>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Prochaines étapes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Confirmation par email
                  </h4>
                  <p className="text-sm text-gray-600">
                    Vous recevrez un email de confirmation avec votre numéro de
                    référence dans les prochaines minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Examen du dossier
                  </h4>
                  <p className="text-sm text-gray-600">
                    Notre équipe administrative examinera votre dossier et
                    vérifiera tous les documents fournis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Notification du statut
                  </h4>
                  <p className="text-sm text-gray-600">
                    Vous serez informé de la décision concernant votre
                    inscription dans les 5 jours ouvrables.
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
                Si vous avez des questions concernant votre inscription,
                n'hésitez pas à nous contacter :
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
            <p>&copy; 2024 {UNIVERSITY_INFO.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
