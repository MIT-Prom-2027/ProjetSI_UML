import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import prisma from "../prisma";
import { Equipment } from "./Equipment";

export class Salle {
  private salleId: number;
  public getSalleId(): number {
    return this.salleId;
  }
  public setSalleId(salleId: number): void {
    this.salleId = salleId;
  }
  public nom: string;
  public capacite: number;
  public latitude?: number;
  public longitude?: number;

  public createdAt?: Date;
  public updatedAt?: Date;

  public equipments?: Equipment[];

  public photo?: string | null;

  constructor(
    salleId: number,
    nom: string,
    capacite: number,
    latitude?: number,
    longitude?: number,
    createdAt?: Date,
    updatedAt?: Date,
    equipments?: Equipment[],
    photo?: string | null
  ) {
    this.salleId = salleId;
    this.nom = nom;
    this.capacite = capacite;
    this.latitude = latitude;
    this.longitude = longitude;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.equipments = equipments;
    this.photo = photo;
  }

  public static async getAllSalles(mentionId: number): Promise<Salle[]> {
    const salles = await prisma.mentionSalle.findMany({
      where: {
        mentionId,
      },
      include: {
        salle: {
          include: {
            equipments: {
              include: {
                equipment: true,
              },
            },
          },
        },
      },
    });

    return salles.map((mentionSalle) => {
      const { salle } = mentionSalle;
      const equipments = salle.equipments.map(
        (eq) =>
          new Equipment(
            eq.equipment.equipmentId,
            eq.equipment.equipmentType,
            eq.equipment.createdAt ?? undefined,
            eq.equipment.updatedAt ?? undefined
          )
      );

      return new Salle(
        salle.salleId,
        salle.nom,
        salle.capacite,
        salle.latitude ?? undefined,
        salle.longitude ?? undefined,
        salle.createdAt ?? undefined,
        salle.updatedAt ?? undefined,
        equipments,
        salle.photo
      );
    });
  }

  public static async getSalleById(id: number): Promise<Salle | null> {
    const salle = await prisma.salle.findUnique({
      where: { salleId: id },
      include: {
        equipments: {
          include: {
            equipment: true,
          },
        },
      },
    });

    if (!salle) return null;

    const equipments = salle.equipments.map(
      (eq) =>
        new Equipment(
          eq.equipment.equipmentId,
          eq.equipment.equipmentType,
          eq.equipment.createdAt ?? undefined,
          eq.equipment.updatedAt ?? undefined
        )
    );

    return new Salle(
      salle.salleId,
      salle.nom,
      salle.capacite,
      salle.latitude ?? undefined,
      salle.longitude ?? undefined,
      salle.createdAt ?? undefined,
      salle.updatedAt ?? undefined,
      equipments,
      salle.photo
    );
  }

  public static async save(
    formData: {
      nom: string;
      capacite: number;
      photo: File | null;
      equipments?: number[] | null;
    },
    mentionId: number
  ) {
    mentionId = Number(mentionId);
    const { nom, capacite, photo, equipments } = formData;

    console.log(equipments);

    try {
      let photoPath: string | null = null;

      if (photo) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const fileExtension = photo.name.split(".").pop();
        const filename = `${nom}-${timestamp}.${fileExtension}`;

        const uploadDir = join(process.cwd(), "public", "uploads");
        const filepath = join(uploadDir, filename);

        try {
          await mkdir(uploadDir, { recursive: true });
        } catch (error) {}

        await writeFile(filepath, buffer);
        photoPath = `/uploads/${filename}`;
      }

      const newSalle = await prisma.salle.create({
        data: {
          nom,
          capacite,
          ...(photoPath && { photo: photoPath }),
        },
      });

      if (equipments && equipments.length > 0) {
        await Promise.all(
          equipments.map((equipmentId) =>
            prisma.equipmentSalle.create({
              data: {
                equipmentId,
                salleId: newSalle.salleId,
              },
            })
          )
        );
      }

      await prisma.mentionSalle.create({
        data: {
          mentionId,
          salleId: newSalle.salleId,
        },
      });

      return {
        success: true,
        ...(photoPath && {
          filename: photoPath.split("/").pop(),
          path: photoPath,
        }),
      };
    } catch (error) {
      console.error("Error saving salle:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save salle",
      };
    }
  }

  public static async updateSalle(
    formData: {
      nom: string;
      capacite: number;
      photo: File | null;
      equipments?: number[] | null;
    },
    mentionId: number
  ) {
    mentionId = Number(mentionId);
    const { nom, capacite, photo, equipments } = formData;

    console.log(equipments);

    try {
      let photoPath: string | null = null;

      if (photo) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const fileExtension = photo.name.split(".").pop();
        const filename = `${nom}-${timestamp}.${fileExtension}`;

        const uploadDir = join(process.cwd(), "public", "uploads");
        const filepath = join(uploadDir, filename);

        try {
          await mkdir(uploadDir, { recursive: true });
        } catch (error) {}

        await writeFile(filepath, buffer);
        photoPath = `/uploads/${filename}`;
      }

      const newSalle = await prisma.salle.create({
        data: {
          nom,
          capacite,
          ...(photoPath && { photo: photoPath }),
        },
      });

      if (equipments && equipments.length > 0) {
        await Promise.all(
          equipments.map((equipmentId) =>
            prisma.equipmentSalle.create({
              data: {
                equipmentId,
                salleId: newSalle.salleId,
              },
            })
          )
        );
      }

      await prisma.mentionSalle.create({
        data: {
          mentionId,
          salleId: newSalle.salleId,
        },
      });

      return {
        success: true,
        ...(photoPath && {
          filename: photoPath.split("/").pop(),
          path: photoPath,
        }),
      };
    } catch (error) {
      console.error("failed to update salle:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update salle",
      };
    }
  }
  public static async deleteSalle(id: number): Promise<boolean> {
    try {
      await prisma.salle.delete({
        where: { salleId: id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
