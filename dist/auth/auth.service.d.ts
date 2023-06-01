import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { LoginUserDto } from "../user/dto/user-login.dto";
import { RegisterUserDto } from "../user/dto/register-user.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
    register(registerUserDto: RegisterUserDto): Promise<{
        token: string;
    }>;
}
