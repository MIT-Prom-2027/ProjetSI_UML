<?php

declare(strict_types=1);

namespace App\Domain\Exporter;

use App\Domain\Utilisateur\Utilisateur;

class FichierExporte {
    private string $nom;
    private string $format;
    private string $cheminStockage;
    private \DateTime $dateGeneration;
    private Utilisateur $generePar;

    public function __construct(string $nom, string $format, string $cheminStockage, \DateTime $dateGeneration, Utilisateur $generePar) {
        $this->nom = $nom;
        $this->format = $format;
        $this->cheminStockage = $cheminStockage;
        $this->dateGeneration = $dateGeneration;
        $this->generePar = $generePar;
    }

    // Getters
    public function getNom(): string { return $this->nom; }
    public function getFormat(): string { return $this->format; }
    public function getCheminStockage(): string { return $this->cheminStockage; }
    public function getDateGeneration(): \DateTime { return $this->dateGeneration; }
    public function getGenerePar(): Utilisateur { return $this->generePar; }

    // Setters
    public function setNom(string $nom): void { $this->nom = $nom; }
    public function setFormat(string $format): void { $this->format = $format; }
    public function setCheminStockage(string $cheminStockage): void { $this->cheminStockage = $cheminStockage; }
    public function setDateGeneration(\DateTime $dateGeneration): void { $this->dateGeneration = $dateGeneration; }
    public function setGenerePar(Utilisateur $generePar): void { $this->generePar = $generePar; }
}


?>