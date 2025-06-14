import prisma from "../prisma";

export class Equipment {
  private equipmentId: number;

  public getEquipmentId(): number {
    return this.equipmentId;
  }

  public setEquipmentId(id: number): void {
    this.equipmentId = id;
  }

  public equipmentType: string;
  public createdAt?: Date | null;
  public updateAt?: Date | null;

  constructor(
    equipmentId: number = 0,
    equipmentType: string = "",
    createdAt?: Date | null,
    updateAt?: Date | null
  ) {
    this.equipmentId = equipmentId;
    this.equipmentType = equipmentType;
    this.createdAt = createdAt;
    this.updateAt = updateAt;
  }

  public static async getAllEquipments(): Promise<Equipment[]> {
    const equipments = await prisma.equipment.findMany({});
    return equipments.map(
      (equipment) =>
        new Equipment(
          equipment.equipmentId,
          equipment.equipmentType,
          equipment.createdAt ?? undefined,
          equipment.updatedAt ?? undefined
        )
    );
  }

  public static async save(equipmentType: string): Promise<Equipment> {
    const equipment = await prisma.equipment.create({
      data: {
        equipmentType,
      },
    });

    return new Equipment(
      equipment.equipmentId,
      equipment.equipmentType,
      equipment.createdAt ?? null,
      equipment.updatedAt ?? null
    );
  }
}
