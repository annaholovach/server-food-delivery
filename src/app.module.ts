import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
const configService = new ConfigService();


@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: `.env`,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: `${configService.get('POSTGRES_PASSWORD')}`,
    database: configService.get('POSTGRES_DB'),
    migrations: [],
    synchronize: false,
    autoLoadEntities: true,
  }),
  UserModule,
  ProductModule,
  CartModule,
  OrderModule,
  AuthModule],
  controllers: [AuthController],
})
export class AppModule {}
