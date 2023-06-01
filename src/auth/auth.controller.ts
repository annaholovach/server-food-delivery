import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../user/dto/user-login.dto";
import {RegisterUserDto} from "../user/dto/register-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @Post('registration')
    public async register(@Body() registerUserDto: RegisterUserDto) {
        return await this.authService.register(registerUserDto);
    }
}
