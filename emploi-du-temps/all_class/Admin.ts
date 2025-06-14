import prisma from "../prisma";
import { Person } from "./Person";

export class Admin extends Person {
  private adminId: string;

  public getAdminId(): string {
    return this.adminId;
  }

  public setAdminId(adminId: string) {
    this.adminId = adminId;
  }

  constructor(
    adminId: string,
    personId: string,
    lastname: string,
    userId: string,
    firstname?: string
  ) {
    super(personId, lastname, userId, firstname);
    this.adminId = adminId;
  }

  public static async getAllAdmin(): Promise<Admin[]> {
    const admins = await prisma.admin.findMany({
      include: {
        person: true,
      },
    });

    return admins.map(
      (admin) =>
        new Admin(
          admin.adminId,
          admin.person.personId,
          admin.person.lastname,
          admin.person.userId,
          admin.person.firstname || undefined
        )
    );
  }

  

}
