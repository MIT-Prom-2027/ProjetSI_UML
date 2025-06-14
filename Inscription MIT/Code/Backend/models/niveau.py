from . import db

class Niveau(db.Model):
    __tablename__ = 'niveau'

    id_niveau = db.Column(db.Integer, primary_key=True)
    niv = db.Column(db.String(10), nullable=False, unique=True)
    descr = db.Column(db.String(100), nullable=False, unique=True)

    # Relation avec Parcours (un niveau possède plusieurs parcours)
    parcours = db.relationship('Parcours', backref='niveau', lazy=True)
    selecteds = db.relationship("Selected", back_populates="niveau", lazy=True)

    def __init__(self, niv):
        self.niv = niv

    def get_id(self):
        return self.id_niveau

    def get_niv(self):
        return self.niv

    def set_niv(self, niv):
        self.niv = niv

    def get_descr(self):
        return self.descr

    def set_descr(self, descr):
        self.descr = descr