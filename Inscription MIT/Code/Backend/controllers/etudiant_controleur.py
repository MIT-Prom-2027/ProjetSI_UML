from models import db, Etudiant, Inscription, PieceJointe
from models.enums import StatutInscription , Sexe , TypeDocument
from models.selected import Selected
from models.niveau import Niveau
from models.parcours import Parcours
import os
from werkzeug.utils import secure_filename
import json

class EtudiantController:
    """
    Contrôleur pour la gestion des étudiants selon le nouveau diagramme UML
    """
    
    def __init__(self):
        self.niveau = None
        self.parcours = None
        self.inscriptions = []
    
    #prendre les informations de l'etudiant selon l'id en parametre
    def get_etudiant(self, id):
        """
        Récupère un étudiant par son ID
        Selon le diagramme UML: getEtudiant(id : string) : Etudiant
        """
        try:
            etudiants = Etudiant.query.filter_by(id_etudiant=id).all()

            resultat = []
            for etudiant in etudiants:
                etudiant_dict = {
                    "id": etudiant.id_etudiant,
                    "nom": etudiant.nom,
                    "prenom": etudiant.prenom,
                    "email": etudiant.email,
                    "tel": etudiant.tel,
                    "num_inscription": etudiant.num_inscription,
                    "serie": etudiant.serie,
                    "date_naissance": etudiant.date_naissance.isoformat() if etudiant.date_naissance else None,
                    "lieu_naissance": etudiant.lieu_naissance,
                    "nationalite": etudiant.nationalite,
                    "genre": etudiant.genre.name if etudiant.genre else None
                }
                resultat.append(etudiant_dict)

            return resultat
        except Exception as e:
            print(f"Erreur lors de la récupération de l'étudiant {id}: {e}")
            return None
    
    def get_etudiant(self, nom , prenom):
        """
        Récupère un étudiant par son ID
        Selon le diagramme UML: getEtudiant(id : string) : Etudiant
        """
        try:
            etudiants = Etudiant.query.filter_by(nom=nom , prenom = prenom).all()

            resultat = []
            print(etudiants)
            if not etudiants:
                return []

            for etudiant in etudiants:
                etudiant_dict = {
                    "id": etudiant.id_etudiant,
                    "nom": etudiant.nom,
                    "prenom": etudiant.prenom,
                    "email": etudiant.email,
                    "tel": etudiant.tel,
                    "num_inscription": etudiant.num_inscription,
                    "serie": etudiant.serie,
                    "date_naissance": etudiant.date_naissance.isoformat() if etudiant.date_naissance else None,
                    "lieu_naissance": etudiant.lieu_naissance,
                    "nationalite": etudiant.nationalite.name if etudiant.nationalite else None,
                    "genre": etudiant.genre.name if etudiant.genre else None,
                    "adresse":etudiant.adresse,
                    "cin":etudiant.cin
                }
                resultat.append(etudiant_dict)

            print(resultat)

            return resultat
        except Exception as e:
            print(f"Erreur lors de la récupération de l'étudiant {nom} {prenom}: {e}")
            return None
       
    # Méthodes de l'ancien contrôleur adaptées
    def get_niveau(self):
        """Retourne la liste de tous les niveaux disponibles"""
        data = [{
            "id_niveau": n.id_niveau,
            "niv": n.niv,
            "descr": n.descr
        } for n in Niveau.query.all()]
        return data

    def get_parcours_by_niveau(self, niveau):
        """Retourne les parcours disponibles pour un niveau donné"""
        niveau = Niveau.query.filter_by(id_niveau=niveau).first()
        if not niveau:
            return []
        
        print(niveau.parcours)
        return [{
            "id_parcour": n.id_parcour,
            "parcour": n.parcour,
            "descr": n.descr
        } for n in niveau.parcours]
    
    def get_etudiants_admis(self, niveau_id, parcour_id ,  annee_univ_id):
        """Retourne les combinaisons niveau-parcours sélectionnées"""
        
        results = Selected.query.filter_by(niveau_id= niveau_id, parcour_id = parcour_id , annee_univ_id = annee_univ_id).all()
        return [
            {
                'id': s.id,
                'name': s.nom,
                'firstname': s.prenom,
                'levelId': {
                    "id_niveau": s.niveau.id_niveau,
                    "niv": s.niveau.niv,
                    "descr": s.niveau.descr
                },
                'courseId': {
                    "id_parcour": s.parcours.id_parcour,
                    "parcour": s.parcours.parcour,
                    "descr": s.parcours.descr
                }
            }
            for s in results
        ]
        
    def verifier_donnee(self, inscription_data):
        """Vérifie la validité des données d'inscription"""
        
        print("ATO ZAO")
        print(f"RETO : {inscription_data['email']}")
        # Vérifier l'unicité de l'email et du numéro d'inscription
        existing_etudiant = Etudiant.query.filter(
            (Etudiant.email == inscription_data['email']) 
            (Etudiant.num_inscription == inscription_data['num_inscription']) | 
            (Etudiant.tel == inscription_data['tel'])|
            (Etudiant.cin == inscription_data['cin'])
        ).first()
        
        if existing_etudiant:
            return False, "Email ou numéro d'inscription ou numéro de telephone ou cin déjà utilisé"

        print("METY HATRETO")
        return True, "Données valides"

    def get_inscription_detail(self, inscription_id):
        """Récupère les détails complets d'une inscription"""
        # inscription = Inscription.query.get(inscription_id)

        inscriptions = Inscription.query.options(
                db.joinedload(Inscription.etudiant),
                db.joinedload(Inscription.pieces_jointes),
                db.joinedload(Inscription.annee_universitaire)
            ).filter_by(id_inscription=inscription_id).all()

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

            annee_univ = None
            if ins.annee_universitaire:
                annee_univ = {
                    "id": ins.annee_universitaire.id,
                    "date_debut": ins.annee_universitaire.date_debut.isoformat(),
                    "date_fin": ins.annee_universitaire.date_fin.isoformat()
                }

            resultats.append({
                "id": ins.id_inscription,
                "statut": ins.statut.value if ins.statut else None,
                "date_soumission": ins.date_soumission.isoformat(),
                "info_complet": ins.info_complet,
                "niveau": ins.niveau.value if ins.niveau else None,
                "parcours": ins.parcours.value if ins.parcours else None,
                "annee_universitaire": annee_univ,
                "etudiant": etudiant_dict,
                "doc": pieces
            })

        return resultats
    
    def enregistrer_inscription(self, inscription_data , files):
        try:
            # print(inscription_data)
            is_finish = self.remplir_information(inscription_data , files)

            # Ici, ils sont déjà ajoutés à la session et commit dans remplir_information,
            # donc théoriquement pas besoin de les ré-ajouter, ni commit.

            return is_finish

        except Exception as e:
            db.session.rollback()
            raise ValueError(f"Erreur lors de l'enregistrement de l'inscription : {str(e)}")
       
    def update_inscription(self, inscription_id ,  data,files):
        try:
            etudiant_id = inscription_id


            inscription_data = data["etudiantInfo"]

            if isinstance(inscription_data , str):
                inscription_data = json.loads(inscription_data)



            
            if not etudiant_id:
                raise ValueError("ID de l'étudiant requis pour la mise à jour.")

            # Récupérer les objets
            etudiant = Etudiant.query.get(id_etudiant =  etudiant_id)
            if not etudiant:
                raise ValueError("Étudiant introuvable.")
            
            inscription = Inscription.query.filter_by(id_etudiant=etudiant.id_etudiant).first()
            if not inscription:
                raise ValueError("Inscription introuvable pour cet étudiant.")

            # Dictionnaires de correspondance : champ => objet cible
            etudiant_fields = ["nom", "prenom", "email", "tel", "num_inscription",
                            "date_naissance", "lieu_naissance", "genre", "nationalite",
                            "cin", "adresse"]
            for field in etudiant_fields:
                if field in inscription_data:
                    value = inscription_data[field]
                    if field == "genre":
                        setattr(etudiant, field, Sexe[value])
                    else:
                        setattr(etudiant, field, value)

            inscription_fields = ["niveau", "parcours"]
            for field in inscription_fields:
                if field in inscription_data:
                    enum_cls = Niveau if field == "niveau" else Parcours
                    setattr(inscription, field, enum_cls[inscription_data[field]])

            # Mise à jour dynamique des pièces jointes
            pieces = {
                "residence": TypeDocument.RESIDENCE,
                "recu_faculte": TypeDocument.RECU_FACULTE,
                "photo": TypeDocument.PHOTO,
                "cin_recto": TypeDocument.CIN_RECTO,
                "cin_verso": TypeDocument.CIN_VERSO,
                "releve_de_note": TypeDocument.RELEVE_DE_NOTE
            }

            UPLOAD_FOLDER = '/tmp/uploads/' + etudiant.id_etudiant
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            documents = files

            for champ, type_piece in pieces.items():
                if champ in documents and documents[champ]:
                    file = documents[champ]

                    extension = os.path.splitext(file.filename)[1]
                    nom_fichier = f"{type_piece.name.lower()}_{etudiant.id_etudiant}{extension}"
                    nom_fichier = secure_filename(nom_fichier)
                    chemin_fichier = os.path.join(UPLOAD_FOLDER, nom_fichier)

                    file.save(chemin_fichier)

                    piece = PieceJointe.query.filter_by(
                        id_inscription=inscription.id_inscription,
                        type_doc=type_piece
                    ).first()

                    if piece:
                        piece.fichier = chemin_fichier
                    else:
                        nouvelle_piece = PieceJointe(
                            type_doc=type_piece,
                            fichier=chemin_fichier,
                            id_inscription=inscription.id_inscription,
                            id_etudiant=etudiant.id_etudiant
                        )
                        db.session.add(nouvelle_piece)

            db.session.commit()
            return inscription

        except Exception as e:
            db.session.rollback()
            raise ValueError(f"Erreur lors de la mise à jour de l'inscription : {str(e)}")

    def remplir_information(self, data , files):

        inscription_data = data["etudiantInfo"]

        if isinstance(inscription_data , str):
            inscription_data = json.loads(inscription_data)


        etudiant = Etudiant.query.filter_by(id_etudiant=inscription_data.get("id")).first()

        
        pieces_jointes = []

        if etudiant:
            
            print("existing etuiant")

            # Mise à jour minimale des infos

            #si le mail a changé tester son existence et modifier
            if etudiant.email != inscription_data["email"]:
                existing_etudiant = Etudiant.query.filter(
                    (Etudiant.email == inscription_data['email']) 
                ).first()
                
                if existing_etudiant:
                    raise ValueError( "Email déjà utilisé")
                else:
                    etudiant.email = inscription_data["email"]

            #si le tel a changé tester son existence et modifier
            if etudiant.tel != inscription_data["tel"]:
                existing_etudiant = Etudiant.query.filter(
                    (Etudiant.tel == inscription_data['tel']) 
                ).first()
                
                if existing_etudiant:
                    raise ValueError( "tel déjà utilisé")
                else:
                    etudiant.tel = inscription_data["tel"]

            etudiant.adresse = inscription_data["adresse"]

            db.session.commit()

            print("tonga hatreto : vita etudiant")

            niv = data["levelId"]
            if isinstance(niv , str):
                niv = json.loads(niv)

            course = data["courseId"]
            if isinstance(course , str):
                course = json.loads(course)

            inscription = Inscription(
                niveau=niv["id_niveau"],
                parcours=course["id_parcour"],
                id_etudiant=etudiant.id_etudiant
            )

            print(inscription.statut)

            print("tonga hatreto inscription")      
            db.session.add(inscription)
            db.session.commit()

            
            UPLOAD_FOLDER = '/tmp/uploads/' + etudiant.id_etudiant
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            pieces = {
                "residence": TypeDocument.RESIDENCE,
                "recu_faculte": TypeDocument.RECU_FACULTE,
                "photo": TypeDocument.PHOTO
            }

            documents = files

            for champ, type_piece in pieces.items():
                if champ in documents and documents[champ]:
                    file = documents[champ]

                    extension = os.path.splitext(file.filename)[1]
                    nom_fichier = f"{type_piece.name.lower()}_{etudiant.id_etudiant}{extension}"
                    nom_fichier = secure_filename(nom_fichier)

                    chemin_fichier = os.path.join(UPLOAD_FOLDER, nom_fichier)

                    file.save(chemin_fichier)

                    piece = PieceJointe.query.filter_by(
                        id_inscription=inscription.id_inscription,
                        type_doc=type_piece
                    ).first()

                    if piece:
                        piece.fichier = chemin_fichier
                    else:
                        nouvelle_piece = PieceJointe(
                            type_doc=type_piece,
                            fichier=chemin_fichier,
                            id_inscription=inscription.id_inscription,
                            id_etudiant=etudiant.id_etudiant
                        )

                        print("TONGA TETO ZAO TSIKA")
                        db.session.add(nouvelle_piece)
                        pieces_jointes.append(nouvelle_piece)
                    
            list_pieces_non_changeantes = {
                "cin_recto" : TypeDocument.CIN_RECTO,
                "cin_verso" : TypeDocument.CIN_VERSO,
                "releve_de_note" : TypeDocument.RELEVE_DE_NOTE
            }

            pieces_non_changeantes   =  PieceJointe.query.filter_by(id_etudiant=inscription_data.get("id_etudiant")).all()

            for p in pieces_non_changeantes:
                if p.type_doc in list_pieces_non_changeantes.values():
                    p.id_inscription = inscription.id_inscription
            
            db.session.commit()

        else:
            valide, message = self.verifier_donnee(inscription_data)
            if not valide:
                raise ValueError(message)

            # Création d'un nouvel étudiant
            nouvel_etudiant = Etudiant(
                nom=inscription_data["nom"],
                prenom=inscription_data["prenom"],
                email=inscription_data["email"],
                tel=inscription_data["tel"],
                num_inscription=inscription_data["num_inscription"],
                date_naissance=inscription_data["date_naissance"],
                lieu_naissance=inscription_data["lieu_naissance"],
                genre=Sexe[inscription_data["genre"]],
                nationalite=inscription_data.get("nationalite", "Malagasy"),
                cin=inscription_data["cin"],
                adresse=inscription_data["adresse"]
            )
            db.session.add(nouvel_etudiant)
            db.session.commit()

            niv = data["levelId"]
            if isinstance(niv , str):
                niv = json.loads(niv)

            course = data["courseId"]
            if isinstance(course , str):
                course = json.loads(course)

            
            inscription = Inscription(
                niveau=niv["id_niveau"],
                parcours=course["id_parcour"],
                id_etudiant=etudiant.id_etudiant
            )

            db.session.add(inscription)
            db.session.commit()

            UPLOAD_FOLDER = '/tmp/uploads/' + nouvel_etudiant.id_etudiant
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            pieces = {
                "residence": TypeDocument.RESIDENCE,
                "recu_faculte": TypeDocument.RECU_FACULTE,
                "photo": TypeDocument.PHOTO,
                "cin_recto": TypeDocument.CIN_RECTO,
                "cin_verso": TypeDocument.CIN_VERSO,
                "releve_de_note": TypeDocument.RELEVE_DE_NOTE
            }

            documents = inscription_data.get("Documents", {})

            for champ, type_piece in pieces.items():
                if champ in documents and documents[champ]:
                    file = documents[champ]

                    extension = os.path.splitext(file.filename)[1]
                    nom_fichier = f"{type_piece.name.lower()}_{nouvel_etudiant.id_etudiant}{extension}"
                    nom_fichier = secure_filename(nom_fichier)

                    chemin_fichier = os.path.join(UPLOAD_FOLDER, nom_fichier)

                    file.save(chemin_fichier)

                    piece = PieceJointe.query.filter_by(
                        id_inscription=inscription.id_inscription,
                        type_doc=type_piece
                    ).first()

                    if piece:
                        piece.fichier = chemin_fichier
                    else:
                        nouvelle_piece = PieceJointe(
                            type_doc=type_piece,
                            fichier=chemin_fichier,
                            id_inscription=inscription.id_inscription,
                            id_etudiant=nouvel_etudiant.id_etudiant
                        )
                        db.session.add(nouvelle_piece)
                        pieces_jointes.append(nouvelle_piece)

        db.session.commit()

        if etudiant:
            return True
        else:
            return True    