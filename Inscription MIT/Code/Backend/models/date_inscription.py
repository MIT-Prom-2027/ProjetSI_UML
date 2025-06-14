from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from datetime import datetime
from . import db  # Importer le db de __init__.py

class Date_inscription(db.Model):
    __tablename__ = 'date_inscription'

    id_date_inscription = db.Column(db.Integer, primary_key=True)
    date_debut = db.Column(db.DateTime, nullable=False)
    date_fin = db.Column(db.DateTime)

    annee_univ = db.Column(
        db.String(100),
        db.ForeignKey('annee_universitaire.id')
    )

    # Relation inverse explicite
    annee_universitaire = db.relationship('Annee_universitaire', back_populates='date_inscription')

    def __repr__(self):
        return f"<DateInscription {self.id_date_inscription} - {self.annee_univ}>"

    @classmethod
    def get_current_year_inscription(self):
        """Retourne l'année universitaire actuelle"""
        now = datetime.now()

        # Filtrage des dates
        data = self.query.filter(
            self.date_debut <= now,
            or_(
                self.date_fin == None,
                self.date_fin > now
            )
        ).first()

        # Si aucun enregistrement trouvé
        if not data:
            return {
                "isActive": False,
            }

        # Vérification que data.date_inscription existe
        # annee = getattr(data, 'annee_universitaire', None)
        # print(annee)
        return {
            "isActive": True,
            "school_year": {
                "id_annee_univ": data.annee_univ,
            },
            "registration_period": {
                "date_debut": getattr(data, 'date_debut', None),
                "date_fin": getattr(data, 'date_fin', None)
            }
        }
