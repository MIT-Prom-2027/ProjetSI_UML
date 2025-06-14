from . import db
from .enums import TypeDocument
from sqlalchemy import Enum

class PieceJointe(db.Model):
    __tablename__ = 'piece_jointe'
    
    id_piece_jointe = db.Column(db.Integer, primary_key=True)
    type_doc = db.Column(Enum(TypeDocument), nullable=False)
    fichier = db.Column(db.String(255), nullable=False)  # Chemin vers le fichier
    
    # Clé étrangère vers Inscription
    id_inscription = db.Column(db.Integer, db.ForeignKey('inscription.id_inscription'), nullable=False)
    id_etudiant = db.Column(db.String(50), db.ForeignKey('etudiant.id_etudiant'), nullable=False)
    
    def __init__(self, type_doc, fichier, id_inscription, id_etudiant):
        self.type_doc = type_doc
        self.fichier = fichier
        self.id_inscription = id_inscription
        self.id_etudiant = id_etudiant

    # Getters
    def get_type(self):
        return self.type_doc
    
    def get_fichier(self):
        return self.fichier
    
    def get_id_inscription(self):
        return self.id_inscription
    
    # Setters
    def set_type(self, type_doc):
        self.type_doc = type_doc
    
    def set_fichier(self, fichier):
        self.fichier = fichier
    
    def set_id_inscription(self, id_inscription):
        self.id_inscription = id_inscription
    
    def to_dict(self):
        return {
            'id': self.id,
            'type_doc': self.type_doc.value if self.type else None,
            'fichier': self.fichier,
            'id_inscription': self.id_inscription
        }


