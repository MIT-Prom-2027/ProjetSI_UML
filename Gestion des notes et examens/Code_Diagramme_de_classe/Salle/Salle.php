<?php

declare(strict_types=1);
namespace App\Domain\Salle;

class Salle {
    private int $id;
    private string $nom;
    private int $capacite;

    public function __construct(int $id, string $nom, int $capacite) {
        $this->id = $id;
        $this->nom = $nom;
        $this->capacite = $capacite;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getNom(): string { return $this->nom; }
    public function getCapacite(): int { return $this->capacite; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setNom(string $nom): void { $this->nom = $nom; }
    public function setCapacite(int $capacite): void { $this->capacite = $capacite; }
}
?>