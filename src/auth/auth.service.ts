import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    private async generateToken(userData: any) {
        const payload = {
            id: userData._id,
            email: userData.email
        }

        const secretKey: string | undefined = process.env.JWT_SECRET;
        if (!secretKey || secretKey.length == 0) {
            throw new HttpException('cannot find jwt secret', 500)
        }

        return jwt.sign(payload, secretKey, {
            expiresIn: '1d'
        })
    }

    async createUser(userData: RegisterDto): Promise<object> {
        console.log('1111111111');
        
        const { firstName, lastName, email, password } = userData;

        const user = await this.userModel.findOne({ email: email });
        if (user) {
            throw new HttpException('user with this infos already exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        const token = await this.generateToken(newUser);

        return {
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
            token,
        }
    }

    async loginUser(userData: LoginDto): Promise<object> {
        const { email, password } = userData;

        const user = await this.userModel.findOne({ email: email })
        if (!user) {
            throw new HttpException('there\' no user exist with this email', HttpStatus.NOT_FOUND);
        }

        const checkPassword = bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw new HttpException('password incorrect', HttpStatus.CONFLICT);
        }

        const token = await this.generateToken(user);
        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token,
        }
    }
}
