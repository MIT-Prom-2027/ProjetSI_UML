# API Backend - Système d'Inscription MIT

## Description
API Flask pour la gestion des inscriptions universitaires (MIT) avec interface administrateur.

## Structure du Projet

```
inscription_backend/
├── app.py                 # Point d'entrée de l'application
├── config.py              # Configuration de l'application
├── requirements.txt       # Dépendances Python
├── .env.example           # Exemple de configuration environnement
├── database/                # Donnee de test pour la BD
│   ├── database.sql
├── models/                # Modèles de données
│   ├── __init__.py
│   ├── enums.py         	# Énumérations (Niveau, Parcours, etc.)
│   ├── niveau.py  		# Modèle Niveau
│   ├── parcours.py  		# Modèle Parcours
│   ├── piece_jointe.py  	# Modèle Etudiants selectionnes pour l'annee universitaire
│   ├── etudiant.py      	# Modèle Étudiant
│   ├── annee_universitaire.py  # Modèle Annee universitaire
│   ├── date_inscription.py     # Modèle Periode d'inscription
│   ├── inscription.py   	# Modèle Inscription
│   ├── piece_jointe.py  	# Modèle PièceJointe
│   └── badge.py         	# Modèle Badge
├── controllers/         # Contrôleurs métier
│   ├── __init__.py
│   ├── etudiant_controleur.py
│   └── admin_controleur.py
├── services/           # Services
│   ├── __init__.py
│   ├── email_service.py
│   └── badge_service.py
│   └── sim_service.py
└── routes/             # Routes API
    ├── __init__.py
    ├── etudiant_routes.py
    └── admin_routes.py
```

## Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd Backend
```

2. **Créer un environnement virtuel**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

3. **Installer les dépendances**
```bash
pip install -r requirements.txt
```

4. **Configuration**
```bash
cp .env.example .env
# Éditer le fichier .env avec vos configurations
```

5. **Lancer l'application**
```bash
python app.py
```

## API Endpoints

### Routes Étudiants (`/api/etudiant`)

- `GET /niveaux` - Liste des niveaux d'étude
- `GET /parcours/<niveau>` - Parcours par niveau
- `POST /etudiants-admis` - Liste des étudiants admis
- `POST /etudiants-by-name` - Liste des étudiants a partir de nom et prenom obtenu
- `GET /etudiant-info/<num_inscription>` - Info étudiant
- `POST /inscription` - Créer une inscription
- `GET /inscription/<id>` - Obtenir une information sur une inscription
- `PUT /inscription/<id>` - Modifier une inscription
- `GET /enums` - Énumérations disponibles
- ...

### Routes Admin (`/api/admin`)

- `GET /dashboard` - Statistiques dashboard
- `GET /inscription/<id>` - Détails inscription
- `POST /inscription/<id>/verifier` - Vérifier inscription
- `POST /inscription/<id>/valider` - Valider inscription
- `POST /inscription/<id>/rejeter` - Rejeter inscription
- `GET /inscription/<id>/badge` - Télécharger badge
- ...

## Fonctionnalités

### Pour les Étudiants
1. **Processus d'inscription en 5 étapes**
   - Choix du niveau d'étude
   - Choix du parcours
   - Sélection dans la liste des admis
   - Formulaire d'informations personnelles
   - Upload des pièces jointes

2. **Gestion des pièces jointes**
   - Photo d'identité
   - Carte d'identité nationale recot-verso
   - Justificatif de résidence
   - Relevé de notes

### Pour les Administrateurs
1. **Dashboard avec statistiques**
2. **Gestion des inscriptions**
   - Filtrage par statut, niveau, parcours
   - Recherche par nom/prénom
   - Pagination
3. **Validation/Rejet des inscriptions**
4. **Génération automatique de badges**
5. **Envoi d'emails automatiques**

## Technologies Utilisées

- **Flask** - Framework web Python
- **SQLAlchemy** - ORM pour base de données
- **Pillow** - Traitement d'images pour badges
- **QRCode** - Génération de QR codes
- **Flask-CORS** - Gestion CORS pour frontend

## Configuration Email

Pour activer l'envoi d'emails, configurez dans `.env`:
```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=true
MAIL_USERNAME=votre-email@gmail.com
MAIL_PASSWORD=votre-mot-de-passe-app
```
Pour activer l'envoi de message, configurez dans `.env`:
```
TOKEN = token-mapi
```

## Base de Données

L'application utilise Postgres par défaut.
On trouve la base de donnee dans le Database

## Développement

L'application est structurée selon le pattern MVC avec:
- **Models** : Définition des entités et relations
- **Controllers** : Logique métier
- **Routes** : Endpoints API
- **Services** : Services transversaux (email, badge)

