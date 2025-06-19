
import prisma from "../utils/prisma";
import { Role } from "./Role";
import { Role as PrismaRole} from "@prisma/client";
import { Profession as PrismaProfession } from "@prisma/client";
import { Utilisateur } from "./Utilisateur";
import { Profession } from "./Profession";

export class GestionUser {

  async is_Admin(id_admin: string): Promise<boolean> {
    const admin = await prisma.utilisateur.findUnique({
      where: { role: Role.ADMIN, id: id_admin }
    });
    return admin?.role === "ADMIN";
  }

  public async getAllComptes(): Promise<Utilisateur[]> {
    const utils = await prisma.utilisateur.findMany({
      include: {
        personne: true
      }
    });
    
    if (!utils) {
      throw new Error("Aucun compte trouvé");
    }
    else{
      const utilisateurs = utils.map(async (util) => {

        if (!util.personne) {
          throw new Error("Personne associée non trouvée pour l'utilisateur");
        }
        else{
          return new Utilisateur(
            util.id,
            util.personne?.nom,
            util.personne?.prenom,
            util.personne?.email,
            util.personne?.image,
            mapPrismaToAppProfession(util.personne.profession),
            util.id,
            util.nomUtilisateur,
            util.motDePasse,
            mapPrismaToAppRole(util.role),
            util.descripteurVisage
          );}
      });

      return await Promise.all(utilisateurs);
   }

  }

  public async getCompte(id: string): Promise<Utilisateur | null> {
    const util = await prisma.utilisateur.findUnique({
      where: { id },
      include: {
        personne: true
      }
    });

    if (util && util.personne) {
      return new Utilisateur(
        util.personne.id,
        util.personne.nom,
        util.personne.prenom,
        util.personne.email,
        util.personne.image,
        mapPrismaToAppProfession(util.personne.profession),
        util.id,
        util.nomUtilisateur,
        util.motDePasse,
        mapPrismaToAppRole(util.role),
        util.descripteurVisage
      );
    }
    return null;
  }

  public verify_information(newUtilisateur: Utilisateur): boolean {
    if(newUtilisateur.getNom() == null || newUtilisateur.getNomUtilisateur()){
      return false;
    }

    return true;
  }

  public async update_user(id: string, u: Utilisateur): Promise<Utilisateur | null> {
    if(u.getEmail() === null || u.getEmail() === "") {
      return null;
    }
    else{
      await prisma.utilisateur.update({ where: { id },
        data : {
          nomUtilisateur: u.getNomUtilisateur(),
          motDePasse: u.getMotDePasse(),
          role: u.getRole(),
          descripteurVisage: u.getDescripteurVisage(),
          personne: {
            update: {
              nom: u.getNom(),
              prenom: u.getPrenom(),
              email: u.getEmail() as string
            }
          }
        },
        include : {
          personne: true,
        }
      });

      return u;
    }
  }

  public async is_compte_existe(id: string): Promise<boolean> {
    const compte = await prisma.utilisateur.findUnique({ where: { id } });
    return compte !== null;
  }

  public async supprimer_compte(id: string): Promise<void> {
    await prisma.utilisateur.delete({ where: { id } });
  }
}

export const mapPrismaToAppRole = (prismaRole: PrismaRole): Role => {
  switch (prismaRole) {
    case Role.ADMIN:
      return Role.ADMIN;
    case PrismaRole.PROFESSEUR:
      return Role.PROFESSEUR;
    default:
      return Role.UTILISATEUR;
  }
};

export const mapPrismaToAppProfession = (prismaProfession: PrismaProfession): Profession => {
  switch (prismaProfession) {
    case "PROFESSEUR":
      return Profession.PROFESSEUR;
    default:
      return Profession.ETUDIANT;
  }
}