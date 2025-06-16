<?php
declare(strict_types=1);
namespace App\Domain\Matiere;
class Matiere {
    private int $id;
    private string $code;
    private string $libelle;
    private string $ue;

    public function __construct(int $id, string $code, string $libelle, string $ue) {
        $this->id = $id;
        $this->code = $code;
        $this->libelle = $libelle;
        $this->ue = $ue;
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getCode(): string { return $this->code; }
    public function getLibelle(): string { return $this->libelle; }
    public function getUe(): string { return $this->ue; }

    // Setters
    public function setId(int $id): void { $this->id = $id; }
    public function setCode(string $code): void { $this->code = $code; }
    public function setLibelle(string $libelle): void { $this->libelle = $libelle; }
    public function setUe(string $ue): void { $this->ue = $ue; }
}
?>