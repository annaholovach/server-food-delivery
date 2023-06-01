import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Cart } from '../cart/cart.entity';
import { Product } from '../product/product.entity';
import { ProductToOrder } from './product-to-order.entity';
import { User } from '../user/user.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Product, ProductToOrder, User]),
    forwardRef(() => CartModule),
  ],
})
export class OrderModule {}
