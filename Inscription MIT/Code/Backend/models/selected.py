from . import db
from sqlalchemy.orm import relationship

class Selected(db.Model):
    __tablename__ = 'selected'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100))
  
    niveau_id = db.Column(db.Integer, db.ForeignKey('niveau.id_niveau'))
    parcour_id = db.Column(db.Integer, db.ForeignKey('parcour.id_parcour'))
    annee_univ_id = db.Column(db.String(50), db.ForeignKey('annee_universitaire.id'))

    # Relations (optionnelles si tu veux charger les objets liés)
    niveau = relationship("Niveau")
    parcours = relationship("Parcours")
    annee_univ = relationship("Annee_universitaire")
