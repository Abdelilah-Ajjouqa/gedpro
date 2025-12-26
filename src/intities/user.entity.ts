import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;
}