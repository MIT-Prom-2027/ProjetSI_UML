import prisma from "../prisma";

export class Person {
  personId: string;
  lastname: string;
  firstname?: string;
  userId: string;

  constructor(
    personId: string,
    lastname: string,
    userId: string,
    firstname?: string
  ) {
    this.personId = personId;
    this.lastname = lastname;
    this.firstname = firstname;
    this.userId = userId;
  }

  static async getPersonFromUserId(userId: string): Promise<Person | null> {
    const userWithPerson = await prisma.user.findUnique({
      where: { id: userId },
      include: { person: true },
    });

    if (!userWithPerson?.person) {
      return null;
    }

    const { person } = userWithPerson;
    return new Person(
      person.personId,
      person.lastname,
      person.userId,
      person.firstname ?? undefined
    );
  }
}
