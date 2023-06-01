import { Product } from '../product/product.entity';
import { Order } from './order.entity';
export declare class ProductToOrder {
    id: string;
    order: Order;
    product: Product;
}
