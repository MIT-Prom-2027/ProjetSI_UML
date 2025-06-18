<?php

declare(strict_types=1);

namespace App\Domain\Examen;
use DateTime;
class PlanningExamen implements \JsonSerializable {
    private int $id;
    private DateTime $dateExamen;
    private DateTime $heureDebut;
    private DateTime $heureFin;
    private string $statut; // Proposé, Validé, Refusé

    public function __construct(int $id, DateTime $dateExamen, DateTime $heureDebut, DateTime $heureFin, string $statut) {
        $this->id = $id;
        $this->dateExamen = $dateExamen;
        $this->heureDebut = $heureDebut;
        $this->heureFin = $heureFin;
        $this->statut = $statut;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getDateExamen(): DateTime { return $this->dateExamen; }
    public function getHeureDebut(): DateTime { return $this->heureDebut; }
    public function getHeureFin(): DateTime { return $this->heureFin; }
    public function getStatut(): string { return $this->statut; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setDateExamen(DateTime $dateExamen): void { $this->dateExamen = $dateExamen; }
    public function setHeureDebut(DateTime $heureDebut): void { $this->heureDebut = $heureDebut; }
    public function setHeureFin(DateTime $heureFin): void { $this->heureFin = $heureFin; }
    public function setStatut(string $statut): void { $this->statut = $statut; }


    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'dateExamen' => $this->dateExamen->format('Y-m-d'),
            'heureDebut' => $this->heureDebut->format('H:i:s'),
            'heureFin' => $this->heureFin->format('H:i:s'),
            'statut' => $this->statut,
        ];
    }
}
?>