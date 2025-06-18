<?php
declare(strict_types=1);
namespace App\Domain\Utilisateur;
abstract class Utilisateur implements \JsonSerializable {
    protected int $id;
    protected string $nom;
    protected string $prenom;
    protected string $email;

    public function __construct(int $id, string $nom, string $prenom, string $email) {
        $this->id = $id;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->email = $email;
    }

    abstract public function seConnecter();

    public function getId(): int { return $this->id; }
    public function getNom(): string { return $this->nom; }
    public function getPrenom(): string { return $this->prenom; }
    public function getEmail(): string { return $this->email; }

    public function setNom(string $nom): void { $this->nom = $nom; }
    public function setPrenom(string $prenom): void { $this->prenom = $prenom; }
    public function setEmail(string $email): void { $this->email = $email; }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'email' => $this->email,
        ];
    }
}
?>