from flask import Blueprint, request, jsonify, current_app
from controllers.etudiant_controleur import EtudiantController
from models import db, Etudiant, Inscription, PieceJointe, Annee_universitaire
from models.enums import Niveau, Parcours, StatutInscription, TypeDocument, Sexe, Nationalite
import os
from werkzeug.utils import secure_filename

etudiant_bp = Blueprint('etudiant', __name__)
etudiant_controller = EtudiantController()

def allowed_file(filename):
    """Vérifie si le fichier est autorisé"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

@etudiant_bp.route('/universite-info', methods=['GET'])
def get_universite_info():
    """Retourne les informations de l'université pour la page d'accueil"""
    return jsonify({
        'nom': current_app.config.get('UNIVERSITY_NAME'),
        'description': current_app.config.get('UNIVERSITY_DESCRIPTION'),
        'success': True
    })

@etudiant_bp.route('/niveaux', methods=['GET'])
def get_niveaux():
    """Étape 1: Récupère la liste des niveaux d'étude"""
    try:
        niveaux = etudiant_controller.get_niveau()
        return jsonify({
            'niveaux': niveaux,
            'success': True
        })

    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/parcours/<niveau>', methods=['GET'])
def get_parcours(niveau):
    """Étape 2: Récupère les parcours disponibles pour un niveau"""
    try:
        parcours = etudiant_controller.get_parcours_by_niveau(niveau)
        return jsonify({
            'parcours': parcours,
            'niveau': niveau,
            'success': True
        })
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/etudiants-admis', methods=['POST'])
def get_etudiants_admis():
    """Étape 3: Récupère la liste des étudiants admis pour un niveau et parcours"""
    try:
        data = request.get_json()
        niveau = data.get('niveau')
        parcours = data.get('parcours')
        id_annee_univ = data.get('id_annee_univ')

        print(niveau, parcours, id_annee_univ)
        if not niveau or not parcours:
            print("Erreur post")
            return jsonify({
                'error': 'Niveau et parcours requis',
                'success': False
            }), 400
        
        etudiants = etudiant_controller.get_etudiants_admis(niveau,parcours,id_annee_univ)
        return jsonify({
            'etudiants_admis': etudiants,
            'niveau': niveau,
            'parcours': parcours,
            'success': True
        })
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/etudiant-info/<num_inscription>', methods=['GET'])
def get_etudiant_info(id):
    """Récupère les informations d'un étudiant par son numéro d'inscription"""
    try:
        etudiant = etudiant_controller.get_one_information(id)
        if etudiant:
            return jsonify({
                'etudiant': etudiant.to_dict(),
                'success': True
            })
        else:
            return jsonify({
                'error': 'Étudiant non trouvé',
                'success': False
            }), 404
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/etudiant_by_name', methods=['POST'])
def get_etudiant_info_by_name():
    """Récupère les informations d'un étudiant par son numéro d'inscription"""
    try:
        data = request.get_json()
        nom = data.get('nom')
        prenom = data.get('prenom')

        if not nom or not prenom:
            print("Erreur post")
            return jsonify({
                'error': 'Niveau et parcours requis',
                'success': False
            }), 400
        
        etudiants = etudiant_controller.get_etudiant(nom,prenom)
        return jsonify({
            'etudiant': etudiants,
            'success': True
        })
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500
        
@etudiant_bp.route('/inscription', methods=['POST'])
def creer_inscription():
    """Étape 4: Crée une nouvelle inscription avec les informations personnelles"""
    try:
        data = request.form.to_dict()
        print("Form Data:", data)

        # Récupération des fichiers (ex: photo, pièce d’identité, etc.)
        files = request.files.to_dict()
        print(files)
        
        # Enregistrer l'inscription
        result = etudiant_controller.enregistrer_inscription(data , files)
        return jsonify({
            'success': result
        })
        
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/inscription/<int:inscription_id>', methods=['PUT'])
def modifier_inscription(inscription_id):
    """Modifie une inscription existante"""
    try:
        data = request.form.to_dict()
        print("Form Data:", data)

        # Récupération des fichiers (ex: photo, pièce d’identité, etc.)
        files = request.files.to_dict()
        print(files)
                
        
        success, result = etudiant_controller.update_inscription(inscription_id, data,files)
        if success:
            return jsonify({
                'inscription': result.to_dict(),
                'message': 'Inscription modifiée avec succès',
                'success': True
            })
        else:
            return jsonify({
                'error': result,
                'success': False
            }), 400
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/inscription/<int:inscription_id>', methods=['GET'])
def get_inscription_detail(inscription_id):
    try:
        etudiant = etudiant_controller.get_inscription_detail(id)
        if etudiant:
            return jsonify({
                'etudiant': etudiant.to_dict(),
                'success': True
            })
        else:
            return jsonify({
                'error': 'Étudiant non trouvé',
                'success': False
            }), 404
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/enums', methods=['GET'])
def get_enums():
    """Retourne tous les enums pour les formulaires"""
    return jsonify({
        'niveaux': Niveau.get_all(),
        'parcours': Parcours.get_all(),
        'sexes': Sexe.get_all(),
        'types_documents': TypeDocument.get_all(),
        'success': True
    })

@etudiant_bp.route('/inscription/<int:inscription_id>/status', methods=['GET'])
def get_inscription_status(inscription_id):
    """Récupère le statut d'une inscription"""
    try:
        from models import Inscription
        inscription = Inscription.query.get(inscription_id)
        if not inscription:
            return jsonify({
                'error': 'Inscription non trouvée',
                'success': False
            }), 404
        
        return jsonify({
            'inscription_id': inscription.id,
            'status': inscription.status.value,
            'date_soumission': inscription.date_soumission.isoformat(),
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/etudiant/<string:id>', methods=['GET'])
def get_etudiant_by_id(id):
    """
    Récupère un étudiant par son ID
    Nouvelle route selon le diagramme UML: getEtudiant(id : string) : Etudiant
    """
    try:
        etudiant = etudiant_controller.get_etudiant(id)
        if etudiant:
            return jsonify({
                'etudiant': etudiant.to_dict(),
                'success': True
            })
        else:
            return jsonify({
                'error': 'Étudiant non trouvé',
                'success': False
            }), 404
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/modification/<int:inscription_id>', methods=['GET'])
def modifier_inscription_via_lien(inscription_id):
    """
    Accès à la modification d'inscription via lien (use case du diagramme de séquence)
    """
    try:
        from models import Inscription
        inscription = Inscription.query.get(inscription_id)
        
        if not inscription:
            return jsonify({
                'error': 'Inscription non trouvée',
                'success': False
            }), 404
        
        # Récupérer les informations de l'étudiant pour pré-remplir le formulaire
        etudiant = inscription.etudiant
        
        return jsonify({
            'inscription': inscription.to_dict(),
            'etudiant': etudiant.to_dict(),
            'pieces_jointes': [piece.to_dict() for piece in inscription.pieces_jointes],
            'success': True
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/annee-universitaire/current', methods=['GET'])
def get_current_annee_universitaire():
    """
    Récupère l'année universitaire actuelle
    """
    try:
        annee_actuelle = Annee_universitaire.get_current_year()
        if annee_actuelle:
            return jsonify({
                'annee_universitaire': annee_actuelle.to_dict(),
                'success': True
            })
        else:
            return jsonify({
                'message': 'Aucune année universitaire active',
                'success': False
            }), 404
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@etudiant_bp.route('/country', methods=['GET'])
def get_country():
    """
    Récupère l'année universitaire actuelle
    """
    try:
        country = Nationalite.get_all()
        # print(country)
        if country:
            return jsonify({
                'country': country,
                'success': True
            })
        else:
            return jsonify({
                'message': 'Aucune année universitaire active',
                'success': False
            }), 404
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

