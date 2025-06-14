from . import db
from .enums import StatutInscription
from datetime import datetime

class Inscription(db.Model):
    __tablename__ = 'inscription'
    
    id_inscription = db.Column(db.Integer, primary_key=True)
    statut = db.Column(
        db.Enum(
            *[e.value for e in StatutInscription],
            name="statut_inscription_enum"  
        ),
        default=StatutInscription.PENDING.value,
        nullable=False
    )

    date_soumission = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    info_complet = db.Column(db.Boolean, default=False, nullable=False)  # Nouveau champ
    id_niveau = db.Column(db.Integer, db.ForeignKey('niveau.id_niveau'), nullable=False)
    id_parcour = db.Column(db.Integer, db.ForeignKey('parcour.id_parcour'), nullable=False)

    # Relations
    id_etudiant = db.Column(db.String(50), db.ForeignKey('etudiant.id_etudiant'), nullable=False)
    annee_univ = db.Column(db.String(50), db.ForeignKey('annee_universitaire.id'), nullable=True)
    
    # Relations avec autres entités
    # pieces_jointes = db.relationship('PieceJointe', backref='inscription', lazy=True, cascade='all, delete-orphan')
    badge = db.relationship('Badge', backref='inscription', uselist=False, cascade='all, delete-orphan')
    
    def __init__(self, id_etudiant, niveau, parcours, annee_universitaire_id=None):
        self.id_etudiant = id_etudiant
        self.id_niveau = niveau
        self.id_parcour = parcours
        self.annee_univ = annee_universitaire_id
        self.statut = StatutInscription.PENDING.value
        self.info_complet = False
        self.date_soumission = datetime.utcnow()
    
    # Getters selon le diagramme UML
    def get_id(self):
        return self.id
    
    def get_statut(self):
        return self.statut
    
    def get_date_soumission(self):
        return self.date_soumission
    
    def get_info_complet(self):
        return self.info_complet
    
    def get_etudiant(self):
        return self.etudiant
    
    def get_niveau(self):
        return self.id_niveau
    
    def get_parcours(self):
        return self.id_parcour
    
    def get_pieces_jointes(self):
        return self.pieces_jointes
    
    def get_annee_universitaire(self):
        return self.annee_univ
    
    # Setters selon le diagramme UML
    def set_statut(self, statut):
        if isinstance(statut, str):
            self.statut = StatutInscription(statut)
        else:
            self.statut = statut
    
    def set_info_complet(self, val):
        self.info_complet = val
    
    def set_etudiant(self, etudiant):
        self.etudiant = etudiant
        if etudiant:
            self.id_etudiant = etudiant.id
    
    def set_niveau(self, niveau):
        self.id_niveau = niveau

    def set_parcours(self, parcours):
        self.id_parcour = parcours
        
    def to_dict(self):
        return {
            'id': self.id,
            'statut': self.statut.value if self.statut else None,
            'date_soumission': self.date_soumission.isoformat() if self.date_soumission else None,
            'info_complet': self.info_complet,
            'niveau': self.id_niveau,
            'parcours': self.id_parcour,
            'id_etudiant': self.id_etudiant,
            'annee_universitaire_id': self.annee_univ
        }

