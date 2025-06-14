// Personne.ts
export class Personne {
  constructor(
    public idPersonne: number,
    public nom: string,
    public prenom: string,
    public address: string,
    public sexe: string,
    public naissance: Date,
    public numero: number,
    public email: string,
  ) {}

  Personne(): void {
    // constructeur ou logique de création
  }
}
