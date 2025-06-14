export class User {
    private id: number;
    public name: string;
    public email: string;
    public email_verified: boolean;
    public image: string;
    public role: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        email_verified: boolean,
        image: string,
        role: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.email_verified = email_verified;
        this.image = image;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }
}