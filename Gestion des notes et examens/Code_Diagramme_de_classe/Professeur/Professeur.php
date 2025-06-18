<?php

declare(strict_types=1);

namespace App\Domain\Professeur\Professeur;

use App\Domain\Utilisateur\Utilisateur;
use App\Domain\Matiere\Matiere;
use App\Domain\Examen\SessionExamen;
use App\Domain\Examen\PlanningExamen;
use App\Domain\Note\Note;
use App\Domain\Professeur\DemandeModificationNote;
use App\Domain\Professeur\DemandeListeEtudiant;
use App\Domain\Exporter\FichierExporte;

class Professeur extends Utilisateur {
    private string $matiereEnseignee;

    public function __construct(int $id, string $nom, string $prenom, string $email, string $matiereEnseignee) {
        parent::__construct($id, $nom, $prenom, $email);
        $this->matiereEnseignee = $matiereEnseignee;
    }

    public function seConnecter() {
        
    }

    public function getMatiereEnseignee(): string { return $this->matiereEnseignee; }
    public function setMatiereEnseignee(string $matiereEnseignee): void { $this->matiereEnseignee = $matiereEnseignee; }

    public function planifierExamen(SessionExamen $session, Matiere $matiere): PlanningExamen {
       
    }
    public function saisirNote(Etudiant $etudiant, Matiere $matiere, float $valeur): Note {
      
    }
    public function modifierNote(Note $note, float $nouvelleValeur): DemandeModificationNote {
       
    }
    public function demanderListeEtudiants(string $niveau, string $ue): DemandeListeEtudiants {
       
    }
    public function visualiserNotes(array $criteres): array {
     
    }
    public function exporterDonnees(array $donnees, string $format): FichierExporte {
      
    }
}
?>
