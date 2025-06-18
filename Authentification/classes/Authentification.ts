import { SessionApp } from "./SessionApp";
import { SessionSys } from "./SessionSys";
import prisma from "../utils/prisma";
import { randomUUID } from "crypto";
import nodemailer from 'nodemailer';
import { Personne } from "./Personne";
import { Utilisateur } from "./Utilisateur";
import bcrypt from "bcryptjs";
import { mapPrismaToAppProfession, mapPrismaToAppRole } from "./GestionUtil";
import sharp from "sharp"
import fs from "fs"

export class Authentification {
  private code: string = "";

  public async estInscrit(nom : string,prenom :string): Promise<boolean> {
    const pers = await prisma.personne.findFirst({
      where: {
        nom: nom,
        prenom: prenom,
      },
    });
    return pers !== null;
  }

  public genererSessionApp(): SessionApp {
    return new SessionApp();
  }

  public genererSessionSys(): SessionSys {
    return new SessionSys();
  }

  public async enregistreUtilisateur(u: Utilisateur): Promise<void> {
    await prisma.utilisateur.create({
      data: {
        nomUtilisateur: u.getNomUtilisateur(),
        motDePasse: bcrypt.hashSync(u.getMotDePasse(),10),
        role: u.getRole(),
        personneId: u.getId()
      }
    });
  }

  public async envoyerCode(email: string): Promise<void> {

    this.code = this.genererCode();

    console.log("Code de vérification généré :", this.code);

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Vérification d'identité`,
        html: `
          <p>Voici le code de vérification de votre inscription <strong>${this.getCode()}</strong></p>
        `,
      });

    } catch (error) {
      console.error(error);
    }

  }

  public genererCode(): string {
    this.code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return this.code;
  }

  public getCode(): string {
    return this.code;
  }

  public setCode(c: string): void {
    this.code = c;
  }

  public async modifierMDP(email: string, mdp: string): Promise<void> {
    const personne = await prisma.personne.findUnique({
      where: { email: email },
      include: { utilisateur: true }
    });

    if (!personne || !personne.utilisateur) {
      throw new Error("Utilisateur non trouvé pour cet email");
    }

    await prisma.utilisateur.update({
      where: { id: personne.utilisateur.id },
      data: { motDePasse: bcrypt.hashSync(mdp, 10) }
    });
  }

  public genererLien(email: string): { lien: string; token: string } {
    const token = randomUUID();
    const baseUrl = "http://localhost:3000/login/mdp";
    const lien = `${baseUrl}?email=${encodeURIComponent(email)}&token=${token}`;
    return { lien, token };
  }

  public async envoyerLien(email: string, lien: string) : Promise<void> {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      text: `Bonjour,\n\nCliquez sur ce lien pour réinitialiser votre mot de passe : ${lien}\n\nSi vous n’avez pas demandé cette réinitialisation, ignorez ce message.`,
      html: `<p>Bonjour,</p><p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${lien}">${lien}</a></p>`
    };

    await transporter.sendMail(mailOptions);
  }

  public async estUnique(u : Utilisateur): Promise<boolean> {
    const pers = await prisma.utilisateur.findFirst({
      where: {
        personneId: u.getId(),
      },
    });

    const util = await prisma.utilisateur.findFirst({
      where: {
        nomUtilisateur: u.getNomUtilisateur(),
      },
    });

    if (pers || util) {
      return false;
    }

    return true;
  }

  public async verifierLogin(nomUtil: string, mdp: string): Promise<Utilisateur | null> {
    const u = await prisma.utilisateur.findFirst({
      where: {
        nomUtilisateur: nomUtil,
      },
      include: {
        personne: true,
      },
    });

    if (u && u.personne) {
      const utilisateur = new Utilisateur(
        u.personne.id,
        u.personne.nom,
        u.personne?.prenom,
        u.personne?.email,
        u.personne.image,
        mapPrismaToAppProfession(u.personne.profession),
        u.id,
        u.nomUtilisateur,
        u.motDePasse,
        mapPrismaToAppRole(u.role),
        u.descripteurVisage
      );

      const valideMDP = utilisateur.comparerMDP(mdp);

      if (valideMDP) {
        return utilisateur;
      } else {
        return null;
      }
    }
    return null;
  }

  public async rechercherPersonne(nom: string, prenom: string): Promise<Personne | null> {
    const personne = await prisma.personne.findFirst({
      where: {
        nom: nom,
        prenom: prenom,
      }
    });

    return personne ? new Personne( personne.id, nom, prenom, personne.email, personne.image, mapPrismaToAppProfession(personne.profession)) : null;
  }

  public async verifierCodeQR(id : string): Promise<Utilisateur | null>{
    const utilisateur = await prisma.utilisateur.findUnique({
      where: {
        id: id,
      },
      include: {
        personne: true,
      },
    });
    if (utilisateur && utilisateur.personne) {
      return new Utilisateur(
        utilisateur.personne.id,
        utilisateur.personne.nom,
        utilisateur.personne?.prenom,
        utilisateur.personne?.email,
        utilisateur.personne.image,
        mapPrismaToAppProfession(utilisateur.personne.profession),
        utilisateur.id,
        utilisateur.nomUtilisateur,
        utilisateur.motDePasse,
        mapPrismaToAppRole(utilisateur.role),
        utilisateur.descripteurVisage
      );
    }
    else {
      return null; 
    }
  }

  public async imageToDescripteur(image: string, dePersonne : boolean): Promise<string | null> {
    try {
      let imageBuffer: Buffer;

      if (dePersonne) {
        if (!fs.existsSync(image)) {
          console.error(`Image non trouvée: ${image}`);
          return null;
        }
        imageBuffer = fs.readFileSync(image);
      } else {
        const base64 = image.replace(/^data:image\/\w+;base64,/, "");
        imageBuffer = Buffer.from(base64, "base64");
      }

      const buffer = await sharp(imageBuffer)
        .greyscale()
        .resize(64, 64, { fit: "fill" })
        .raw()
        .toBuffer(); // retourne un Buffer avec les données pixel brutes (grayscale)

      const pixels = Array.from(buffer); // buffer est de type Uint8Array compatible
      const average = pixels.reduce((sum, pixel) => sum + pixel, 0) / pixels.length;

      let descripteur = "";
      for (let i = 0; i < pixels.length; i++) {
        descripteur += pixels[i] > average ? "1" : "0";
      }

      return descripteur;
    } catch (err) {
      console.error("Erreur extraction descripteur:", err);
      return null;
    }

  }

  public async verifierVisage(image: string): Promise<Utilisateur | null> {

    const descripteur = await this.imageToDescripteur(image, false)

    if (!descripteur) {
      return null
    }

    const utilisateurs = await prisma.utilisateur.findMany({
      where: {
        descripteurVisage: {
          not: null,
        },
      },
      include: {
        personne: true,
      },
    })

    for (const u of utilisateurs) {
      if (!u.descripteurVisage) continue

      const util = new Utilisateur(
        u.personne!.id,
        u.personne!.nom,
        u.personne!?.prenom,
        u.personne!?.email,
        u.personne!.image,
        mapPrismaToAppProfession(u.personne!.profession),
        u.id,
        u.nomUtilisateur,
        u.motDePasse,
        mapPrismaToAppRole(u.role),
        u.descripteurVisage,
      )

      const similarite = util.comparerVisage(descripteur)

      if (similarite > 0.8) {
        return util
      }
    }

    return null
  }
}
