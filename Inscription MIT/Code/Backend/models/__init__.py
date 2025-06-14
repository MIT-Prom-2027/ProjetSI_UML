from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .enums import Niveau, TypeDocument, StatutInscription, Parcours, Sexe
from .etudiant import Etudiant
from .inscription import Inscription
from .piece_jointe import PieceJointe
from .badge import Badge
from .annee_universitaire import Annee_universitaire
from .date_inscription import Date_inscription
