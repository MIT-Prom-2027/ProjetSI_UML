<?php

declare(strict_types=1);
namespace App\Domain\Professeur\DemandeModificationNote;
use DateTime;

class DemandeModificationNote {
    private int $id;
    private float $ancienneNote;
    private float $nouvelleNote;
    private string $justificatif;
    private string $statut; // En attente, Approuvée, Rejetée

    public function __construct(int $id, float $ancienneNote, float $nouvelleNote, string $justificatif, string $statut) {
        $this->id = $id;
        $this->ancienneNote = $ancienneNote;
        $this->nouvelleNote = $nouvelleNote;
        $this->justificatif = $justificatif;
        $this->statut = $statut;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getAncienneNote(): float { return $this->ancienneNote; }
    public function getNouvelleNote(): float { return $this->nouvelleNote; }
    public function getJustificatif(): string { return $this->justificatif; }
    public function getStatut(): string { return $this->statut; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setAncienneNote(float $ancienneNote): void { $this->ancienneNote = $ancienneNote; }
    public function setNouvelleNote(float $nouvelleNote): void { $this->nouvelleNote = $nouvelleNote; }
    public function setJustificatif(string $justificatif): void { $this->justificatif = $justificatif; }
    public function setStatut(string $statut): void { $this->statut = $statut; }
}
?>