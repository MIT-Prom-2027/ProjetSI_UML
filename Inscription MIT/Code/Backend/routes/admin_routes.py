from flask import Blueprint, request, jsonify, send_file
from controllers.admin_controleur import AdminController
from models import db, Inscription, Etudiant, Annee_universitaire, Date_inscription
from models.enums import StatutInscription, Niveau, Parcours
import os

admin_bp = Blueprint('admin', __name__)
admin_controller = AdminController()

@admin_bp.route('/dashboard', methods=['GET'])
def get_dashboard():
    """Page d'accueil du dashboard admin avec statistiques"""
    try:
        stats = admin_controller.get_statistiques()
        return jsonify({
            'statistiques': stats,
            'success': True
        })
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500


@admin_bp.route('/inscription/<int:inscription_id>/valider', methods=['POST'])
def valider_inscription(inscription_id):
    """Valide une inscription"""
    try:
        success, message = admin_controller.valider_inscription(inscription_id)
        if success:
            return jsonify({
                'message': message,
                'success': True
            })
        else:
            return jsonify({
                'error': message,
                'success': False
            }), 400
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/inscription/<int:inscription_id>/rejeter', methods=['POST'])
def rejeter_inscription(inscription_id):
    """Rejette une inscription"""
    try:
        data = request.get_json()
        champs_incorrects = data.get('champs_incorrects', [])
        
        if not champs_incorrects:
            return jsonify({
                'error': 'Veuillez spécifier les champs incorrects',
                'success': False
            }), 400
        
        success, message = admin_controller.rejeter_inscription(
            inscription_id, champs_incorrects
        )
        
        if success:
            return jsonify({
                'message': message,
                'success': True
            })
        else:
            return jsonify({
                'error': message,
                'success': False
            }), 400
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/enums', methods=['GET'])
def get_enums():
    """Retourne tous les enums pour les filtres"""
    return jsonify({
        'niveaux': Niveau.get_all(),
        'parcours': Parcours.get_all(),
        'statuts': StatutInscription.get_all(),
        'success': True
    })

@admin_bp.route('/inscription/<int:inscription_id>/badge', methods=['GET'])
def telecharger_badge(inscription_id):
    """Télécharge le badge d'un étudiant"""
    try:
        from models import Inscription
        inscription = Inscription.query.get(inscription_id)
        
        if not inscription:
            return jsonify({
                'error': 'Inscription non trouvée',
                'success': False
            }), 404
        
        if not inscription.badge or not inscription.badge.est_genere:
            return jsonify({
                'error': 'Badge non généré',
                'success': False
            }), 404
        
        badge_path = inscription.badge.lien.lstrip('/')
        if os.path.exists(badge_path):
            return send_file(badge_path, as_attachment=True)
        else:
            return jsonify({
                'error': 'Fichier badge non trouvé',
                'success': False
            }), 404
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/inscription/<int:inscription_id>/regenerer-badge', methods=['POST'])
def regenerer_badge(inscription_id):
    """Régénère le badge d'un étudiant"""
    try:
        from models import Inscription
        from services.badge_service import BadgeService
        
        inscription = Inscription.query.get(inscription_id)
        if not inscription:
            return jsonify({
                'error': 'Inscription non trouvée',
                'success': False
            }), 404
        
        if inscription.status != StatutInscription.VALID:
            return jsonify({
                'error': 'L\'inscription doit être validée pour générer un badge',
                'success': False
            }), 400
        
        badge_service = BadgeService()
        success, result = badge_service.regenerer_badge(inscription)
        
        if success:
            return jsonify({
                'message': 'Badge rég��néré avec succès',
                'badge_url': result,
                'success': True
            })
        else:
            return jsonify({
                'error': result,
                'success': False
            }), 500
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/ajouter-selected', methods=['POST'])
def ajouter_selected():
    """
    Ajoute une liste d'étudiants sélectionnés
    Nouvelle fonctionnalité selon le diagramme de séquence
    """
    try:
        # Récupérer les données du formulaire
        data = request.get_json()
        
        debut_annee = data.get('debut_annee_universitaire')
        fin_annee = data.get('fin_annee_universitaire')
        debut_inscription = data.get('debut_inscription')
        fin_inscription = data.get('fin_inscription')
        fichier_data = data.get('fichier')  # Base64 ou URL du fichier
        
        if not all([debut_annee, fin_annee, debut_inscription, fin_inscription]):
            return jsonify({
                'error': 'Tous les champs de dates sont requis',
                'success': False
            }), 400
        
        success, message = admin_controller.ajouter_selected(
            fichier_data, debut_annee, fin_annee, debut_inscription, fin_inscription
        )
        
        if success:
            return jsonify({
                'message': message,
                'success': True
            })
        else:
            return jsonify({
                'error': message,
                'success': False
            }), 500
            
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/annee-universitaire-actuelle', methods=['GET'])
def get_annees_universitaires_actuelle():
    """
    Récupère année universitaire actuelle, ainsi le duréé d'inscription
    """
    try:
        annees = Date_inscription.get_current_year_inscription()
        return jsonify({
            'current_year': annees,
            'success': True
        })
    except Exception as e:
        print(str(e))
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/annees-universitaires', methods=['GET'])
def get_annees_universitaires():
    """
    Récupère toutes les années universitaires
    """
    try:
        annees = Annee_universitaire.query.all()
        return jsonify({
            'annees_universitaires': [annee.to_dict() for annee in annees],
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@admin_bp.route('/annees-universitaires', methods=['POST'])
def create_annee_universitaire():
    """
    Crée une nouvelle année universitaire
    """
    try:
        data = request.get_json()

        if admin_controleur.verifier_selected(data):
            date_debut = data.get('date_debut')
            date_fin = data.get('date_fin')
            
            if not date_debut or not date_fin:
                return jsonify({
                    'error': 'Les dates de début et fin sont requises',
                    'success': False
                }), 400
            
            from datetime import datetime
            
            # Convertir les chaînes en objets datetime
            debut = datetime.fromisoformat(date_debut.replace('Z', '+00:00'))
            fin = datetime.fromisoformat(date_fin.replace('Z', '+00:00'))
            
            # Créer la nouvelle année universitaire
            nouvelle_annee = Annee_universitaire(date_debut=debut, date_fin=fin)
            db.session.add(nouvelle_annee)
            db.session.commit()
            
            return jsonify({
                'annee_universitaire': nouvelle_annee.to_dict(),
                'message': 'Année universitaire créée avec succès',
                'success': True
            })
        return jsonify({
            'annee_universitaire': {},
            'message': 'Création année universitaire échouée',
            'success': False
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': str(e),
            'success': False
        }), 500
