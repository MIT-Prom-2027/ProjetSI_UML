<?php

declare(strict_types=1);

namespace App\Domain\Professeur\DemandeListeEtudiant;
class DemandeListeEtudiants {
    private int $id;
    private array $filtres; // map
    private string $format; // CSV, Excel
    private string $statut; // En attente, Générée, Échouée
    private string $lienSecurise;
    private \DateTime $dateExpirationLien;

    public function __construct(int $id, array $filtres, string $format, string $statut, string $lienSecurise, \DateTime $dateExpirationLien) {
        $this->id = $id;
        $this->filtres = $filtres;
        $this->format = $format;
        $this->statut = $statut;
        $this->lienSecurise = $lienSecurise;
        $this->dateExpirationLien = $dateExpirationLien;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getFiltres(): array { return $this->filtres; }
    public function getFormat(): string { return $this->format; }
    public function getStatut(): string { return $this->statut; }
    public function getLienSecurise(): string { return $this->lienSecurise; }
    public function getDateExpirationLien(): \DateTime { return $this->dateExpirationLien; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setFiltres(array $filtres): void { $this->filtres = $filtres; }
    public function setFormat(string $format): void { $this->format = $format; }
    public function setStatut(string $statut): void { $this->statut = $statut; }
    public function setLienSecurise(string $lienSecurise): void { $this->lienSecurise = $lienSecurise; }
    public function setDateExpirationLien(\DateTime $dateExpirationLien): void { $this->dateExpirationLien = $dateExpirationLien; }
}
?>