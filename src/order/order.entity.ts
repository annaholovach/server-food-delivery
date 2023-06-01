import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ProductStatus } from './enums/product-startus.enum';
import { ProductToOrder } from './product-to-order.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: ProductStatus })
  public status: string;

  @ManyToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public user: User;

  @OneToMany(() => ProductToOrder, (productToOrder) => productToOrder.order, {
    eager: true,
    cascade: true,
  })
  public listsProducts: ProductToOrder[];
}
