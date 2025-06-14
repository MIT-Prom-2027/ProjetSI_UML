import os
import uuid
from PIL import Image, ImageDraw, ImageFont
from models import db
from flask import current_app
import qrcode

class BadgeService:
    """
    Service de génération de badges selon le nouveau diagramme UML
    """
    
    def __init__(self):
        self.badge_dir = "static/badges"
        self.qr_dir = "static/qr_codes"
        os.makedirs(self.badge_dir, exist_ok=True)
        os.makedirs(self.qr_dir, exist_ok=True)

    def generer_lien_badge (self, id_inscription):
        try:
            from models import Inscription
            inscription = Inscription.query.get(id_inscription)
            
            if not inscription or not inscription.etudiant:
                raise ValueError(f"Inscription {id_inscription} non trouvée")
            
            etudiant = inscription.etudiant
            
            # Générer le QR code avec les informations de l'étudiant
            qr_data = {
                'id': etudiant.id,
                'nom': etudiant.nom,
                'prenom': etudiant.prenom,
                'num_inscription': etudiant.num_inscription,
                'niveau': inscription.niveau.value,
                'parcours': inscription.parcours.value,
                'annee_bacc': etudiant.annee_bacc
            }       
            badge_filename = self._generer_badge_image(etudiant, inscription, qr_filename)
            
            # Mettre à jour le badge dans la base de données
            if not inscription.badge:
                from models import Badge
                badge = Badge(inscription_id=inscription.id)
                inscription.badge = badge
            
            inscription.badge.lien = f"/static/badges/{badge_filename}"
            
            from models import db
            db.session.commit()
            
            return inscription.badge.lien
            
        except Exception as e:
            print(f"Erreur lors de la génération du badge: {e}")
            raise    


    def generer_badge(self, id_inscription):
        """
        Génère un badge pour une inscription donnée
        Selon le diagramme UML: generateBadge(idInscription : int) : void
        """
        try:
            from models import Inscription
            inscription = Inscription.query.get(id_inscription)
            
            if not inscription or not inscription.etudiant:
                raise ValueError(f"Inscription {id_inscription} non trouvée")
            
            etudiant = inscription.etudiant
            
            # Générer le QR code avec les informations de l'étudiant
            data = {
                'id': etudiant.id,
                'nom': etudiant.nom,
                'prenom': etudiant.prenom,
                'num_inscription': etudiant.num_inscription,
                'niveau': inscription.niveau.value,
                'parcours': inscription.parcours.value,
                'annee_bacc': etudiant.annee_bacc
            }
            
            return data
            
        except Exception as e:
            print(f"Erreur lors de la génération du badge: {e}")
            raise
    
    def _generer_qr_code(self, data, id_inscription):
        """Génère un QR code contenant les informations de l'étudiant"""
        try:
            # Données à encoder dans le QR code
            qr_data = f"NUM:{data['num_inscription']}|NOM:{data['nom']}|PRENOM:{data['prenom']}|NIVEAU:{data['niveau']}|PARCOURS:{data['parcours']}|ANNEE_BACC:{data['annee_bacc']}"
            
            # Créer le QR code
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(qr_data)
            qr.make(fit=True)
            
            # Créer l'image du QR code
            qr_img = qr.make_image(fill_color="black", back_color="white")
            
            # Sauvegarder le QR code
            qr_filename = f"qr_{id_inscription}.png"
            qr_path = os.path.join(self.qr_dir, qr_filename)
            qr_img.save(qr_path)
            
            return qr_path
            
        except Exception as e:
            print(f"Erreur lors de la génération du QR code: {e}")
            return None
    
    def _generer_badge_image(self, etudiant, inscription, qr_filename):
        """Crée l'image du badge"""
        # Dimensions du badge
        width, height = 600, 400
        
        # Créer une nouvelle image avec fond blanc
        img = Image.new('RGB', (width, height), color='white')
        draw = ImageDraw.Draw(img)
        
        # Couleurs
        primary_color = (0, 51, 102)  # Bleu foncé
        secondary_color = (0, 102, 204)  # Bleu clair
        text_color = (51, 51, 51)  # Gris foncé
        
        # Dessiner l'en-tête
        draw.rectangle([0, 0, width, 80], fill=primary_color)
        
        # Titre de l'université
        try:
            title_font = ImageFont.truetype("arial.ttf", 24)
            subtitle_font = ImageFont.truetype("arial.ttf", 16)
            name_font = ImageFont.truetype("arial.ttf", 20)
            info_font = ImageFont.truetype("arial.ttf", 14)
        except:
            # Fallback si les polices ne sont pas disponibles
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            name_font = ImageFont.load_default()
            info_font = ImageFont.load_default()
        
        # Texte de l'en-tête
        university_name = current_app.config.get('UNIVERSITY_NAME', 'Université')
        draw.text((width//2, 25), university_name, fill='white', font=title_font, anchor='mm')
        draw.text((width//2, 55), "BADGE ÉTUDIANT", fill='white', font=subtitle_font, anchor='mm')
        
        # Photo placeholder (rectangle gris)
        photo_x, photo_y = 50, 120
        photo_width, photo_height = 120, 150
        draw.rectangle([photo_x, photo_y, photo_x + photo_width, photo_y + photo_height], 
                      fill=(200, 200, 200), outline=primary_color, width=2)
        draw.text((photo_x + photo_width//2, photo_y + photo_height//2), "PHOTO", 
                 fill=text_color, font=info_font, anchor='mm')
        
        # Informations de l'étudiant
        info_x = photo_x + photo_width + 30
        info_y = 120
        
        # Nom et prénom
        full_name = f"{etudiant.prenom} {etudiant.nom}".upper()
        draw.text((info_x, info_y), full_name, fill=primary_color, font=name_font)
        
        # Numéro d'inscription
        draw.text((info_x, info_y + 40), f"N° Inscription: {etudiant.num_inscription}", 
                 fill=text_color, font=info_font)
        
        # Niveau et parcours
        draw.text((info_x, info_y + 65), f"Niveau: {inscription.niveau.value}", 
                 fill=text_color, font=info_font)
        draw.text((info_x, info_y + 90), f"Parcours: {inscription.parcours.value}", 
                 fill=text_color, font=info_font)
        
        # Date de naissance
        draw.text((info_x, info_y + 115), f"Né(e) le: {etudiant.date_naissance}", 
                 fill=text_color, font=info_font)
        
        # Générer et ajouter le QR code
        if qr_filename and os.path.exists(qr_filename):
            try:
                qr_img = Image.open(qr_filename)
                qr_img = qr_img.resize((80, 80))
                img.paste(qr_img, (width - 120, height - 120))
            except:
                # Si le QR code ne peut pas être ajouté, continuer sans
                pass
        
        # Ligne de séparation
        draw.line([50, height - 50, width - 50, height - 50], fill=secondary_color, width=2)
        
        # Pied de page
        draw.text((width//2, height - 25), "Badge valide pour l'année universitaire en cours", 
                 fill=text_color, font=info_font, anchor='mm')
        
        # Sauvegarder l'image
        badge_filename = f"badge_{etudiant.num_inscription}_{uuid.uuid4().hex[:8]}.png"
        badge_path = os.path.join(self.badge_dir, badge_filename)
        img.save(badge_path, 'PNG', quality=95)
        
        return badge_filename