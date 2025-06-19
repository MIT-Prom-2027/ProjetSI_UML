<?php

declare(strict_types=1);

namespace App\Domain\Etudiant;
use App\Domain\Utilisateur\Utilisateur;
class Etudiant extends Utilisateur {
    private string $matricule;
    private string $niveau;
    private array $demandesReleve; // Un étudiant peut faire plusieurs demandes

    public function __construct(int $id, string $nom, string $prenom, string $email, string $matricule, string $niveau) {
        parent::__construct($id, $nom, $prenom, $email);
        $this->matricule = $matricule;
        $this->niveau = $niveau;
        $this->demandesReleve = [];
    }

    public function seConnecter() {
        // Logique de connexion étudiant
    }

    public function getMatricule(): string { return $this->matricule; }
    public function getNiveau(): string { return $this->niveau; }
    public function getDemandesReleve(): array { return $this->demandesReleve; }

    public function setMatricule(string $matricule): void { $this->matricule = $matricule; }
    public function setNiveau(string $niveau): void { $this->niveau = $niveau; }

    public function demanderReleveNotes(): DemandeReleve {
        $demande = new DemandeReleve(/* paramètres à définir selon la classe */);
        $this->demandesReleve[] = $demande;
        return $demande;
    }
}
?>