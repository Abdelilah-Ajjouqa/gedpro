import { Controller, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
    @Post('register')
    async register(){
        //
    }

    @Post('login')
    async login(){
        //
    }
}
