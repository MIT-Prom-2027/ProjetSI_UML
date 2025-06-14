import { Inscription } from "./Inscription";
import { Person } from "./Person";

export class Student extends Person {
  private studentId: string;
  public inscriptions?: Inscription[] = [];

  public getstudentId(): string {
    return this.studentId;
  }

  public setAdminId(studentId: string) {
    this.studentId = studentId;
  }

  constructor(
    studentId: string,
    personId: string,
    lastname: string,
    userId: string,
    firstname?: string
  ) {
    super(personId, lastname, userId, firstname);
    this.studentId = studentId;
  }

  public addInscription(inscription: Inscription) {
    this.inscriptions?.push(inscription);
  }
}
