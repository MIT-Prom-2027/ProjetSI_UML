from . import db
from .enums import Sexe
from .enums import Nationalite
from sqlalchemy import Enum
import cuid

class Etudiant(db.Model):
    __tablename__ = 'etudiant'
    
    id_etudiant = db.Column(db.String(50), primary_key=True , default=cuid.cuid)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    num_inscription = db.Column(db.String(50), unique=True, nullable=False)
    # annee_bacc = db.Column(db.String(4), nullable=False)  # Nouveau champ
    serie = db.Column(db.String(50), nullable=False)  # Nouveau champ
    tel = db.Column(db.String(20), nullable=False)
    date_naissance = db.Column(db.String(10), nullable=False)  # Format: YYYY-MM-DD
    lieu_naissance = db.Column(db.String(100), nullable=False)
    nationalite = db.Column(Enum(Nationalite), nullable=False, default="Malagasy")
    genre = db.Column(Enum(Sexe), nullable=False)
    adresse = db.Column(db.String(100), nullable=False)
    cin = db.Column(db.String(12), nullable=False)

    # Relation avec Inscription
    inscription = db.relationship('Inscription', backref='etudiant', uselist=False)
    pieces_jointes = db.relationship('PieceJointe', backref='inscription', lazy=True, cascade='all, delete-orphan')

    def __init__(self, id, nom, prenom, email, num_inscription, cin , adresse,
                 serie, tel, date_naissance, lieu_naissance ):
        self.id = id
        self.nom = nom
        self.prenom = prenom
        self.email = email
        # self.fonctionnaire = fonctionnaire
        self.num_inscription = num_inscription
        # self.annee_bacc = annee_bacc
        self.serie = serie
        self.tel = tel
        self.date_naissance = date_naissance
        self.lieu_naissance = lieu_naissance
        self.cin = cin
        self.adresse = adresse
    
    # Getters selon le diagramme UML
    def get_id(self):
        return self.id
    
    def get_nom(self):
        return self.nom
    
    def get_prenom(self):
        return self.prenom
    
    def get_email(self):
        return self.email
        
    def get_num_inscription(self):
        return self.num_inscription
        
    def get_serie(self):
        return self.serie
    
    def get_tel(self):
        return self.tel
    
    def get_date_naissance(self):
        return self.date_naissance
    
    def get_lieu_naissance(self):
        return self.lieu_naissance
    
    def get_adresse(self):
        return self.adresse
    
    def get_cin(self):
        return self.cin
    
    # Setters (ajoutés pour la flexibilité)
    def set_id(self, id_val):
        self.id = id_val
    
    def set_nom(self, nom):
        self.nom = nom
    
    def set_prenom(self, prenom):
        self.prenom = prenom
    
    def set_email(self, email):
        self.email = email
        
    def set_num_inscription(self, num_inscription):
        self.num_inscription = num_inscription
        
    def set_serie(self, serie):
        self.serie = serie
    
    def set_tel(self, tel):
        self.tel = tel
    
    def set_date_naissance(self, date_naissance):
        self.date_naissance = date_naissance
    
    def set_lieu_naissance(self, lieu_naissance):
        self.lieu_naissance = lieu_naissance
    
    def set_adresse(self, adresse):
        self.adresse = adresse
    
    def set_cin(self, cin):
        self.cin = cin
    
    def to_dict(self):
        return {
            'id': self.id,
            'nom': self.nom,
            'prenom': self.prenom,
            'email': self.email,
            'fonctionnaire': self.fonctionnaire,
            'num_inscription': self.num_inscription,
            'annee_bacc': self.annee_bacc,
            'serie': self.serie,
            'tel': self.tel,
            'date_naissance': self.date_naissance,
            'lieu_naissance': self.lieu_naissance,
            'cin' : self.cin,
            'adresse' : self.adresse
        }

