import { writeFile } from "fs/promises";
import { join } from "path";
import prisma from "../prisma";
import { Salle } from "./Salle";

export class Mention {
  private mentionId: number;

  public getMentionId(): number {
    return this.mentionId;
  }

  public setMentionId(mentionId: number): void {
    this.mentionId = mentionId;
  }

  public nom: string;
  public annee_fondation?: number;
  public responsable?: string;
  public logo?: string;
  public salles?: Salle[];

  constructor(
    mentionId: number,
    nom: string,
    annee_fondation?: number,
    responsable?: string,
    logo?: string
  ) {
    this.mentionId = mentionId;
    this.nom = nom;
    this.annee_fondation = annee_fondation;
    this.responsable = responsable;
    this.logo = logo;
  }

  public static async getAllMentions(): Promise<Mention[]> {
    const mentions = await prisma.mention.findMany({
      include: { salles: true },
    });
    return mentions.map(
      (mention) =>
        new Mention(
          mention.mentionId,
          mention.nom,
          mention.annee_fondation ?? undefined,
          mention.responsable ?? undefined,
          mention.logo ?? undefined
        )
    );
  }

  public static async getMentionById(id: number): Promise<Mention | null> {
    const mention = await prisma.mention.findUnique({
      where: { mentionId: id },
    });
    if (!mention) return null;
    return new Mention(
      mention.mentionId,
      mention.nom,
      mention.annee_fondation ?? undefined,
      mention.responsable ?? undefined,
      mention.logo ?? undefined
    );
  }

  public static async save(formData: {
    logo: File | null;
    nom: string;
    responsable: string;
  }) {
    const { logo, nom, responsable } = formData;
    try {
      if (!logo) {
        const newMention = await prisma.mention.create({
          data: {
            nom,
            responsable,
          },
        });
        return {
          success: true,
        };
      }

      // Convert File to buffer
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create filename
      const timestamp = Date.now();
      const fileExtension = logo.name.split(".").pop();
      const filename = `${nom}-${timestamp}.${fileExtension}`;

      // Save to public/uploads
      const uploadDir = join(process.cwd(), "public", "uploads");
      const filepath = join(uploadDir, filename);
      
      // Ensure directory exists
      const fs = require("fs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      await writeFile(filepath, buffer);

      const newMention = await prisma.mention.create({
        data: {
          nom,
          responsable,
          logo: `/uploads/${filename}`,
        },
      });

      return {
        success: true,
        filename,
        path: `/uploads/${filename}`,
      };
    } catch (error) {
      console.error("Error saving mention:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save mention",
      };
    }
  }

  public static async updateMention(
    id: number,
    formData: {
      logo?: File | null;
      nom?: string;
      responsable?: string;
      annee_fondation?: number;
    }
  ) {
    const { logo, nom, responsable, annee_fondation } = formData;

    try {
      // Prepare update data without logo first
      const updateData: any = {};
      if (nom !== undefined) updateData.nom = nom;
      if (responsable !== undefined) updateData.responsable = responsable;
      if (annee_fondation !== undefined)
        updateData.annee_fondation = annee_fondation;

      // Handle logo upload if provided
      if (logo) {
        // Convert File to buffer
        const bytes = await logo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create filename
        const timestamp = Date.now();
        const fileExtension = logo.name.split(".").pop();
        const filename = `${nom || "mention"}-${timestamp}.${fileExtension}`;

        // Save to public/uploads
        const uploadDir = join(process.cwd(), "public", "uploads");
        const filepath = join(uploadDir, filename);

        // Ensure directory exists
        const fs = require("fs");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        await writeFile(filepath, buffer);
        updateData.logo = `/uploads/${filename}`;
      }

      // Update the mention in database
      const updatedMention = await prisma.mention.update({
        where: { mentionId: id },
        data: updateData,
      });

      return {
        success: true,
        filename: logo ? updateData.logo.split("/").pop() : undefined,
        path: logo ? updateData.logo : undefined,
      };
    } catch (error) {
      console.error("Error updating mention:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update mention",
      };
    }
  }

  public static async deleteMention(id: number): Promise<boolean> {
    try {
      await prisma.mention.delete({
        where: { mentionId: id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
