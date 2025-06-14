from . import db
from datetime import datetime

class Annee_universitaire(db.Model):
    __tablename__ = 'annee_universitaire'
    
    id = db.Column(db.String(50), primary_key=True)
    date_debut = db.Column(db.DateTime, nullable=False)
    date_fin = db.Column(db.DateTime, nullable=False)
    
    # Relations
    inscriptions = db.relationship('Inscription', backref='annee_universitaire', lazy=True)
    date_inscription = db.relationship('Date_inscription', back_populates='annee_universitaire', lazy=True)

    def __init__(self, date_debut, date_fin):
        self.date_debut = date_debut
        self.date_fin = date_fin
    
    # Getters
    def get_id(self):
        return self.id
    
    def get_date_debut(self):
        return self.date_debut
    
    def get_date_fin(self):
        return self.date_fin
    
    # Setters
    def set_date_debut(self, date_debut):
        self.date_debut = date_debut
    
    def set_date_fin(self, date_fin):
        self.date_fin = date_fin
    
    def to_dict(self):
        return {
            'id': self.id,
            'date_debut': self.date_debut.isoformat() if self.date_debut else None,
            'date_fin': self.date_fin.isoformat() if self.date_fin else None
        }
    
    def is_active(self):
        """Vérifie si cette année universitaire est active"""
        now = datetime.now()
        return self.date_debut <= now <= self.date_fin

