import bcrypt from "bcryptjs";
import { Personne, Profession } from "./Personne";
import { Role } from "./Role";

export class Utilisateur extends Personne {

  private idUtil: string | null;
  private nomUtilisateur: string;
  private motDePasse: string;
  private role : Role | Role.UTILISATEUR;
  private descripteurVisage: string | null;

  constructor(
    id : string,
    nom : string,
    prenom: string | null,
    email: string | null,
    image: string | null,
    profession: Profession | Profession.ETUDIANT,
    idUtil: string | null,
    nomUtilisateur: string,
    motDePasse: string,
    role : Role | Role.UTILISATEUR,
    descripteurVisage: string | null
  ) {
    super(id, nom, prenom, email, image, profession);
    this.idUtil = idUtil;
    this.nomUtilisateur = nomUtilisateur;
    this.motDePasse = motDePasse;
    this.role = role;
    this.descripteurVisage = descripteurVisage;
  }
  

  public setRole(r : Role) : void{
    this.role = r;
  }

  public getRole() : Role | Role.UTILISATEUR {
    return this.role;
  }

  public setNomUtilisateur(n : string) : void{
    this.nomUtilisateur = n;
  }

  public getNomUtilisateur() : string{
    return this.nomUtilisateur;
  }

  public setMotDePasse(m : string) : void{
    this.motDePasse = m;
  }

  public getMotDePasse() : string{
    return this.motDePasse;
  }
  
  public setIdUtil(id : string) : void{
    this.idUtil = id;
  }

  public getIdUtil() : string | null{
    return this.idUtil;
  }

  public setDescripteurVisage(dv : string | null) : void{
    this.descripteurVisage = dv;
  }

  public getDescripteurVisage() : string | null{
    return this.descripteurVisage;
  }

  public comparerMDP(m : string): boolean{
    return bcrypt.compareSync(m, this.motDePasse);
  }

  public comparerVisage(dv: string): number {
    if (this.descripteurVisage!.length !== dv.length) return 0

    let matches = 0
    for (let i = 0; i < this.descripteurVisage!.length; i++) {
      if (this.descripteurVisage![i] === dv[i]) matches++
    }

    return matches / this.descripteurVisage!.length
  }
}
