import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Cart } from '../cart/cart.entity';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, Cart]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
