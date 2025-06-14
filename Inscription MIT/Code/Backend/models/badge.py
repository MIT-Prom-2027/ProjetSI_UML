from . import db

class Badge(db.Model):
    __tablename__ = 'badge'
    
    id = db.Column(db.Integer, primary_key=True)
    lien = db.Column(db.String(255), nullable=True)
    
    # Clé étrangère vers Inscription
    inscription_id = db.Column(db.Integer, db.ForeignKey('inscription.id_inscription'), nullable=False)
    
    def __init__(self, inscription_id, lien=None):
        self.inscription_id = inscription_id
        self.lien = lien
    
    # Getters
    def get_lien(self):
        return self.lien
    
    def get_inscription_id(self):
        return self.inscription_id
    
    # Setters
    def set_lien(self, lien):
        self.lien = lien
        
    def set_inscription_id(self, inscription_id):
        self.inscription_id = inscription_id
        
    def to_dict(self):
        return {
            'id': self.id,
            'lien': self.lien,
            'est_genere': self.est_genere,
            'inscription_id': self.inscription_id
        }

