import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/dto/user.dto";
import User from "src/intities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export default class UserSerivce {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async createUser(userData: CreateUserDto, hashedPassword: string){
        const {firstName, lastName, email} = userData;
        const newUser = this.userRepository.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getOne(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } })
    }

    async updateUser(){}

    async deleteUser(){}
}