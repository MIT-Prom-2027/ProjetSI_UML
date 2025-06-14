#!/usr/bin/env python3
"""
Script de démarrage pour l'application d'inscription universitaire
"""

import os
import sys
from app import create_app

def setup_environment():
    """Configure l'environnement de développement"""
    # Créer le fichier .env s'il n'existe pas
    print(os.environ.get('DATABASE_URL'))
    if not os.path.exists('.env'):
        print("📝 Création du fichier .env...")
        with open('.env', 'w') as f:
            f.write("""# Configuration de développement
SECRET_KEY=dev-secret-key-change-in-production
DATABASE_URL=sqlite:///inscription.db

# Configuration email (optionnel pour le développement)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=
MAIL_PASSWORD=

# Configuration université
UNIVERSITY_NAME=Université de Madagascar
UNIVERSITY_DESCRIPTION=Une université d'excellence formant les leaders de demain
""")
    else:
        print("✅ Fichier .env créé")
    
    # Créer les dossiers nécessaires
    folders = ['uploads', 'static/badges', 'static/qr_codes', 'static/templates']
    for folder in folders:
        os.makedirs(folder, exist_ok=True)
    
    print("✅ Dossiers créés")

def check_dependencies():
    """Vérifie que toutes les dépendances sont installées"""
    try:
        import flask
        import flask_sqlalchemy
        import flask_cors
        import PIL
        import qrcode
        print("✅ Toutes les dépendances sont installées")
        return True
    except ImportError as e:
        print(f"❌ Dépendance manquante: {e}")
        print("Installez les dépendances avec: pip install -r requirements.txt")
        return False

def main():
    """Fonction principale"""
    print("🚀 Démarrage de l'application d'inscription universitaire")
    print("=" * 60)
    
    # Vérifier les dépendances
    if not check_dependencies():
        sys.exit(1)
    
    # Configurer l'environnement
    setup_environment()
    
    # Créer et démarrer l'application
    print("\n🌟 Création de l'application Flask...")
    app = create_app()
    
    print("\n📊 Configuration:")
    print(f"   - Base de données: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
    print(f"   - Université: {app.config.get('UNIVERSITY_NAME')}")
    print(f"   - Dossier uploads: {app.config.get('UPLOAD_FOLDER')}")
    
    print("\n🌐 Endpoints disponibles:")
    print("   - API Étudiants: http://localhost:5000/api/etudiant")
    print("   - API Admin: http://localhost:5000/api/admin")
    print("   - Documentation: http://localhost:5000/")
    
    print("\n🧪 Pour tester l'API:")
    print("   python test_api.py")
    
    print("\n" + "=" * 60)
    print("🎯 Application prête ! Démarrage du serveur...")
    print("   Appuyez sur Ctrl+C pour arrêter")
    print("=" * 60)
    
    # Démarrer l'application
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == "__main__":
    main()

