import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    email:string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    firstName: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    lastName: string;

    @Column({
        type: "boolean",
        nullable: false,
        default: false
    })
    blocked: boolean;

    constructor(admin: Partial<Admin>) {
        Object.assign(this, admin);
    }
}
