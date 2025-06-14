from . import db

class Parcours(db.Model):
    __tablename__ = 'parcour'

    id_parcour = db.Column(db.Integer, primary_key=True)
    parcour = db.Column(db.String(10), nullable=False, unique=True)
    descr = db.Column(db.String(100), nullable=False, unique=True)

    # Clé étrangère vers Niveau
    id_niveau = db.Column(db.Integer, db.ForeignKey('niveau.id_niveau'), nullable=False)
    selecteds = db.relationship("Selected", back_populates="parcours", lazy=True)

    def __init__(self, parcour, descr, niveau_id):
        self.parcour = parcour
        self.descr = descr
        self.id_niveau = niveau_id

    def get_id(self):
        return self.id_parcour

    def get_parcour(self):
        return self.parcour

    def get_descr(self):
        return self.descr

    def set_descr(self, descr):
        self.descr = descr

    def set_parcour(self, parcour):
        self.parcour = parcour
