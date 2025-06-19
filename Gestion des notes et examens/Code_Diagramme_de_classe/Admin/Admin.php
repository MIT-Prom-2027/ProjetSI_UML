<?php

declare(strict_types=1);

namespace App\Domain\Admin;

use App\Domain\Professeur\Professeur;
use App\Domain\Examen\PlanningExamen;
use App\Domain\Professeur\DemandeModificationNote;
use App\Domain\Relever\DemandeReleve;

class Administrateur extends Professeur {
    private string $grade;

    public function __construct(int $id, string $nom, string $prenom, string $email, string $matiereEnseignee, string $grade) {
        parent::__construct($id, $nom, $prenom, $email, $matiereEnseignee);
        $this->grade = $grade;
    }

    // Getters
    public function getGrade(): string { return $this->grade; }

    // Setters
    public function setGrade(string $grade): void { $this->grade = $grade; }

    // Méthodes du diagramme
    public function validerPlanningExamen(PlanningExamen $planning, bool $decision, string $motif): void {
        // Logique de validation
    }

    public function validerModificationNote(DemandeModificationNote $demande, bool $decision, string $motif): void {
        // Logique de validation
    }

    public function validerDemandeReleve(DemandeReleve $demande, bool $decision, string $motif): void {
        // Logique de validation
    }

    public function gererUtilisateurs() {
        // Logique de gestion utilisateurs
    }

    public function gererPermissions() {
        // Logique de gestion permissions
    }
}
?>