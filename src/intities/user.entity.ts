import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}