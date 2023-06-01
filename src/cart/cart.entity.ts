import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ProductToCart} from "./product-to-cart.entity";
// import { ProductToCart } from './producct-to-cart.entity';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public userId: string;

    @ManyToMany(() => ProductToCart, (productToCart) => productToCart.cart, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    public listsProducts: ProductToCart[];
}
