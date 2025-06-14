from models import db, Inscription, Etudiant, Badge, Annee_universitaire
from models.enums import StatutInscription, Niveau, Parcours
from sqlalchemy import and_, or_
from sqlalchemy.orm import joinedload
# import pandas as pd

class AdminController:
    """
    Contrôleur administrateur selon le nouveau diagramme UML
    """
    
    def __init__(self):
        self.id = "admin_001"
        self.nom = "Administrateur"
        self.email = "admin@universite.mg"
    
    # Getters selon le diagramme UML
    def get_id(self):
        return self.id
    
    def get_nom(self):
        return self.nom
    
    def get_email(self):
        return self.email
    
    # Setters
    def set_id(self, id_val):
        self.id = id_val
    
    def set_nom(self, nom):
        self.nom = nom
    
    def set_email(self, email):
        self.email = email
    
    def consulter_inscription(self):
        """
        Retourne toutes les inscriptions avec les infos de l'étudiant, 
        les pièces jointes, le niveau, le parcours et l'année universitaire.
        """
        try:
            inscriptions = Inscription.query.options(
                db.joinedload(Inscription.etudiant),
                db.joinedload(Inscription.pieces_jointes),
                db.joinedload(Inscription.annee_universitaire)
            ).all()

            resultats = []

            for ins in inscriptions:
                etu = ins.etudiant

                etudiant_dict = {
                    "id_etudiant": etu.id_etudiant,
                    "nom": etu.nom,
                    "prenom": etu.prenom,
                    "email": etu.email,
                    "tel": etu.tel,
                    "num_inscription": etu.num_inscription,
                    "serie": etu.serie,
                    "date_naissance": etu.date_naissance,
                    "lieu_naissance": etu.lieu_naissance,
                    "nationalite": etu.nationalite,
                    "genre": etu.genre.name if etu.genre else None,
                    "adresse": etu.adresse,
                    "cin": etu.cin
                }

                pieces = [
                    {
                        "id": piece.id,
                        "type": piece.type.name,
                        "fichier": piece.fichier
                    }
                    for piece in ins.pieces_jointes
                ]

                # Détail niveau et parcours depuis les Enums
                niveau = ins.niveau.value if ins.niveau else None
                parcours = ins.parcours.value if ins.parcours else None

                annee_univ = None
                if ins.annee_universitaire:
                    annee_univ = {
                        "id": ins.annee_universitaire.id,
                        "date_debut": ins.annee_universitaire.date_debut.isoformat(),
                        "date_fin": ins.annee_universitaire.date_fin.isoformat()
                    }

                inscription_dict = {
                    "id": ins.id_inscription,
                    "statut": ins.statut.value if ins.statut else None,
                    "date_soumission": ins.date_soumission.isoformat(),
                    "info_complet": ins.info_complet,
                    "niveau": niveau,
                    "parcours": parcours,
                    "annee_universitaire": annee_univ,
                    "etudiant": etudiant_dict,
                    "doc": pieces
                }

                resultats.append(inscription_dict)

            return resultats

        except Exception as e:
            print(f"Erreur lors de la récupération de toutes les inscriptions: {e}")
            return []

    def valider_inscription(self, inscription_id):
        """Valide une inscription"""
        try:
            inscription = Inscription.query.get(inscription_id)
            if not inscription:
                return False, "Inscription non trouvée"
            
            # Changer le statut à VALID
            inscription.statut = StatutInscription.VALID
            inscription.info_complet = True
            
            # Créer ou mettre à jour le badge
            if not inscription.badge:
                badge = generer_lien_badge(inscription_id=inscription.id)
                db.session.add(badge)
                inscription.badge = badge
            
            db.session.commit()
            
            # Générer le badge
            from services.badge_service import BadgeService
            badge_service = BadgeService()
            lien_badge = badge_service.generate_badge(inscription.id)
            
            # Envoyer notification avec lien du badge
            from services.sim_service import SimService
            from services.email_service import EmailService            
            if inscription.etudiant.email!="":
                email_service = EmailService()
                email_service.envoyer_lien_badge(inscription.etudiant.email , lien_badge)                
            else:
                sim_service = SimService()
                sim_service.envoyer_lien_badge(inscription.etudiant.tel, lien_badge)
            
            return True, "Inscription validée avec succès"
            
        except Exception as e:
            db.session.rollback()
            return False, str(e)
    
    def rejeter_inscription(self, inscription_id, champs_incorrects):
        """
        Rejette une inscription avec la liste des champs incorrects
        champs_incorrects: liste des champs qui ne sont pas valides
        """
        try:
            inscription = Inscription.query.get(inscription_id)
            if not inscription:
                return False, "Inscription non trouvée"
            
            # Changer le statut à REJECTED
            inscription.statut = StatutInscription.REJECTED
            inscription.info_complet = False
            db.session.commit()
            
            # Envoyer notification de rectification
            # Envoyer notification avec lien du badge
            from services.sim_service import SimService
            from services.email_service import EmailService            
            if inscription.etudiant.email!="":
                email_service = EmailService()
                email_service.envoyer_lien_rectification(inscription.etudiant.email , lien_badge ,champs_incorrects)                
            else:
                sim_service = SimService()
                sim_service.envoyer_lien_rectification(inscription.etudiant.tel, lien_badge, champs_incorrects)
          
            
            return True, "Inscription rejetée, notification de rectification envoyée"
            
        except Exception as e:
            db.session.rollback()
            return False, str(e)
    
    def get_statistiques(self):
        """Récupère les statistiques des inscriptions"""
        total_inscriptions = Inscription.query.count()
        en_attente = Inscription.query.filter_by(statut=StatutInscription.PENDING.value)
        validees = Inscription.query.filter_by(statut=StatutInscription.VALID.value)
        rejetees = Inscription.query.filter_by(statut=StatutInscription.REJECTED.value)

        print(en_attente, validees, rejetees)        
        # Statistiques par niveau
        stats_niveau = {}
        for niveau in Niveau:
            count = Inscription.query.filter_by(niveau=niveau).count()
            stats_niveau[niveau.value] = count
        
        # Statistiques par parcours
        stats_parcours = {}
        for parcours in Parcours:
            count = Inscription.query.filter_by(parcours=parcours).count()
            stats_parcours[parcours.value] = count
        
        # Statistiques par année universitaire
        stats_annee = {}
        annees = Annee_universitaire.query.all()
        for annee in annees:
            count = Inscription.query.filter_by(annee_universitaire_id=annee.id).count()
            stats_annee[f"{annee.date_debut.year}-{annee.date_fin.year}"] = count
        
        return {
            'total': total_inscriptions,
            'en_attente': en_attente,
            'validees': validees,
            'rejetees': rejetees,
            'par_niveau': stats_niveau,
            'par_parcours': stats_parcours,
            'par_annee': stats_annee
        }

    def verifier_selected(self, data):
        """
        Vérifie la validité des données avant enregistrement.
        """
        fichier, debut_annee_universitaire, fin_annee_universitaire, debut_inscription, fin_inscription = data
        try:
            # Vérification du format de fichier
            extension = os.path.splitext(fichier.filename)[1].lower()
            if extension not in ['.csv', '.xlsx']:
                return False, "Format de fichier non supporté. Utilisez un CSV ou un Excel."

            # Vérification des formats de date
            for date_str in [debut_annee_universitaire, fin_annee_universitaire, 
                            debut_inscription, fin_inscription]:
                if not isinstance(date_str, datetime):
                    return False, f"Date invalide : {date_str}. Les dates doivent être des objets datetime."

            # Vérification de la logique temporelle
            if debut_annee_universitaire >= fin_annee_universitaire:
                return False, "La date de début de l'année universitaire doit être antérieure à la date de fin."
            
            if debut_inscription >= fin_inscription:
                return False, "La période d'inscription est invalide."

            if not (debut_annee_universitaire <= debut_inscription <= fin_annee_universitaire):
                return False, "La période d'inscription doit être comprise dans l'année universitaire."

            return True, "Données valides."

        except Exception as e:
            return False, f"Erreur lors de la vérification des données : {str(e)}"        

    
    def ajouter_selected(self, fichier, debut_annee_universitaire, fin_annee_universitaire, 
                        debut_inscription, fin_inscription):
        """
        Ajoute une liste d'étudiants sélectionnés depuis un fichier
        Nouvelle fonctionnalité selon le diagramme de séquence
        """
        try:
            # Créer l'année universitaire si elle n'existe pas
            annee_univ = Annee_universitaire.query.filter(
                Annee_universitaire.date_debut == debut_annee_universitaire,
                Annee_universitaire.date_fin == fin_annee_universitaire
            ).first()
            
            if not annee_univ:
                annee_univ = Annee_universitaire(
                    date_debut=debut_annee_universitaire,
                    date_fin=fin_annee_universitaire
                )
                db.session.add(annee_univ)
                db.session.commit()
            
            # Lecture du fichier (CSV ou Excel)
            if fichier.filename.endswith('.csv'):
                df = pd.read_csv(fichier)
            else:
                df = pd.read_excel(fichier)
            
            etudiants_ajoutes = []
            for _, row in df.iterrows():
                nom = row['nom']
                prenom = row['prenom']
                niveau_id = row['niveau']  # id_niveau attendu
                parcour_id = row['parcour']  # id_parcour attendu

                selected = Selected(
                    nom=nom,
                    prenom=prenom,
                    niveau_id=niveau_id,
                    parcour_id=parcour_id,
                    annee_univ_id=annee_univ.id
                )
                db.session.add(selected)
                etudiants_ajoutes.append(selected)
            
            db.session.commit()
            return True, f"{len(etudiants_ajoutes)} étudiants ajoutés avec succès"
            
        except Exception as e:
            db.session.rollback()
            return False, str(e)
    
    def _traiter_fichier_etudiants(self, fichier, annee_univ):
        """Traite un fichier contenant la liste des étudiants"""
        # Cette méthode devrait traiter différents formats de fichiers
        # Pour l'instant, on simule l'ajout d'étudiants
        etudiants_ajoutes = []
        
        # Simulation d'ajout d'étudiants depuis un fichier
        # Dans une vraie implémentation, on lirait le fichier CSV/Excel
        
        return etudiants_ajoutes
