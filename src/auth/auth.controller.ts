import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    me(){
        console.log('222222222222222')
        return "hello there";
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        console.log(3333333333)
        const res = await this.authService.createUser(registerDto);
        return res
    }

    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {
    //     await this.authService.loginUser(loginDto);
    // }
}
