import { User } from '../user/user.entity';
import { ProductToOrder } from './product-to-order.entity';
export declare class Order {
    id: string;
    status: string;
    user: User;
    listsProducts: ProductToOrder[];
}
