import {forwardRef, Module} from '@nestjs/common';
import { CartService } from './cart.service';
import {CartController} from "./cart.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cart} from "./cart.entity";
import {Product} from "../product/product.entity";
import {User} from "../user/user.entity";
import {ProductToCart} from "./product-to-cart.entity";
import {ProductModule} from "../product/product.module";

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [
      TypeOrmModule.forFeature([Cart, Product, User, ProductToCart]),
      forwardRef(() => ProductModule),]
})
export class CartModule {}
