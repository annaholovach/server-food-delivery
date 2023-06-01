import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Cart } from "../cart/cart.entity";
import { RegisterUserDto } from "./dto/register-user.dto";
export declare class UserService {
    private userRepository;
    private cartRepository;
    constructor(userRepository: Repository<User>, cartRepository: Repository<Cart>);
    getUsersByEmail(email: string): Promise<User>;
    register(createUserDto: RegisterUserDto): Promise<User>;
}
