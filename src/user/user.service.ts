import { Injectable } from '@nestjs/common';
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Cart} from "../cart/cart.entity";
import {RegisterUserDto} from "./dto/register-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
    ) {}

    public async getUsersByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email },
        });
    }

    public async register(createUserDto: RegisterUserDto): Promise<User> {
        const user = await this.userRepository.create({
            ...createUserDto,
        });

        await this.userRepository.save(user);

        const cart = await this.cartRepository.create({
            userId: user.id,
            listsProducts: [],
        });

        await this.cartRepository.save(cart);

        return user;
    }

}
