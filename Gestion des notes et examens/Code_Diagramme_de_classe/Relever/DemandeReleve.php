<?php

declare(strict_types=1);
namespace App\Domain\Relever;
use DateTime;
class DemandeReleve {
    private int $id;
    private string $format; // PDF, Excel
    private string $statut; // En attente, Approuvée, Rejetée
    private string $lienSecurise;
    private \DateTime $dateExpirationLien;

    public function __construct(int $id, string $format, string $statut, string $lienSecurise, \DateTime $dateExpirationLien) {
        $this->id = $id;
        $this->format = $format;
        $this->statut = $statut;
        $this->lienSecurise = $lienSecurise;
        $this->dateExpirationLien = $dateExpirationLien;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getFormat(): string { return $this->format; }
    public function getStatut(): string { return $this->statut; }
    public function getLienSecurise(): string { return $this->lienSecurise; }
    public function getDateExpirationLien(): \DateTime { return $this->dateExpirationLien; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setFormat(string $format): void { $this->format = $format; }
    public function setStatut(string $statut): void { $this->statut = $statut; }
    public function setLienSecurise(string $lienSecurise): void { $this->lienSecurise = $lienSecurise; }
    public function setDateExpirationLien(\DateTime $dateExpirationLien): void { $this->dateExpirationLien = $dateExpirationLien; }
}

?>