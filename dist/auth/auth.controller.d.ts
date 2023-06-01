import { AuthService } from "./auth.service";
import { LoginUserDto } from "../user/dto/user-login.dto";
import { RegisterUserDto } from "../user/dto/register-user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<{
        token: string;
    }>;
}
