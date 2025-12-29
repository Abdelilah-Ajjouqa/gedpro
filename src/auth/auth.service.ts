import { Body, HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user.dto";
import UserSerivce from "src/user/user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserSerivce,
    ) {}

    private async generateToken(payload: object):Promise<string> {
        jwt.sign(payload, )
        

        return "generated_token";
    }

    async register(@Body() registerDto: CreateUserDto) {
        const { firstName, lastName, email, password, confirmPassword } = registerDto;
        const user = await this.userService.getOne(email);
        if (user) {
            throw new HttpException('user with this email already exist', 409);
        }

        if(password !== confirmPassword){
            throw new HttpException('password and confirm password do not match', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.userService.createUser(registerDto, hashedPassword);

        
    }
}