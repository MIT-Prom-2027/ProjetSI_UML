<?php
declare(strict_types=1);
namespace App\Domain\Examen;
use DateTime;
class SessionExamen {
    private int $id;
    private string $type; // Normale, Rattrapage
    private string $anneeUniversitaire;
    private DateTime $dateDebut;
    private DateTime $dateFin;

    public function __construct(int $id, string $type, string $anneeUniversitaire, DateTime $dateDebut, DateTime $dateFin) {
        $this->id = $id;
        $this->type = $type;
        $this->anneeUniversitaire = $anneeUniversitaire;
        $this->dateDebut = $dateDebut;
        $this->dateFin = $dateFin;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getType(): string { return $this->type; }
    public function getAnneeUniversitaire(): string { return $this->anneeUniversitaire; }
    public function getDateDebut(): DateTime { return $this->dateDebut; }
    public function getDateFin(): DateTime { return $this->dateFin; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setType(string $type): void { $this->type = $type; }
    public function setAnneeUniversitaire(string $anneeUniversitaire): void { $this->anneeUniversitaire = $anneeUniversitaire; }
    public function setDateDebut(DateTime $dateDebut): void { $this->dateDebut = $dateDebut; }
    public function setDateFin(DateTime $dateFin): void { $this->dateFin = $dateFin; }
}
?>