<?php

use App\Domain\User\User;
use Tests\TestCase;
use DateTime;

class Note {
    private int $id;
    private float $valeur;
    private string $statut; // Provisoire, Validée, En attente, Refusée
    private string $commentaire;
    private DateTime $dateSaisie;
    private ?DateTime $dateValidation;

    public function __construct(int $id, float $valeur, string $statut, string $commentaire, DateTime $dateSaisie, ?DateTime $dateValidation = null) {
        $this->id = $id;
        $this->valeur = $valeur;
        $this->statut = $statut;
        $this->commentaire = $commentaire;
        $this->dateSaisie = $dateSaisie;
        $this->dateValidation = $dateValidation;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getValeur(): float { return $this->valeur; }
    public function getStatut(): string { return $this->statut; }
    public function getCommentaire(): string { return $this->commentaire; }
    public function getDateSaisie(): DateTime { return $this->dateSaisie; }
    public function getDateValidation(): ?DateTime { return $this->dateValidation; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setValeur(float $valeur): void { $this->valeur = $valeur; }
    public function setStatut(string $statut): void { $this->statut = $statut; }
    public function setCommentaire(string $commentaire): void { $this->commentaire = $commentaire; }
    public function setDateSaisie(DateTime $dateSaisie): void { $this->dateSaisie = $dateSaisie; }
    public function setDateValidation(?DateTime $dateValidation): void { $this->dateValidation = $dateValidation; }
}
?>