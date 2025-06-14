import { DayOfWeek } from "@prisma/client";
import prisma from "../prisma";

export class Creneau {
  private creneauId: number;
  public startTime: Date;
  public endTime: Date;
  public dayName: DayOfWeek;

  public getCreneauId(): number {
    return this.creneauId;
  }

  public setcreneauId(creneauId: number): void {
    this.creneauId = creneauId;
  }

  constructor(
    creneauId: number,
    startTime: Date,
    endTime: Date,
    dayName: DayOfWeek
  ) {
    this.creneauId = creneauId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.dayName = dayName;
  }

  static async create(data: {
    creneauId: number;
    startTime: Date;
    endTime: Date;
    dayName: DayOfWeek;
  }): Promise<Creneau> {
    const created = await prisma.creneau.create({ data });
    return new Creneau(
      created.creneauId,
      created.startTime,
      created.endTime,
      created.dayName
    );
  }

  static async read(creneauId: number): Promise<Creneau | null> {
    const found = await prisma.creneau.findUnique({ where: { creneauId } });
    if (!found) return null;
    return new Creneau(
      found.creneauId,
      found.startTime,
      found.endTime,
      found.dayName
    );
  }

  static async update(
    creneauId: number,
    data: Partial<{
      startTime: Date;
      endTime: Date;
      dayName: DayOfWeek;
    }>
  ): Promise<Creneau | null> {
    const updated = await prisma.creneau.update({
      where: { creneauId },
      data,
    });
    if (!updated) return null;
    return new Creneau(
      updated.creneauId,
      updated.startTime,
      updated.endTime,
      updated.dayName
    );
  }

  static async delete(creneauId: number): Promise<boolean> {
    try {
      await prisma.creneau.delete({ where: { creneauId } });
      return true;
    } catch {
      return false;
    }
  }
}
