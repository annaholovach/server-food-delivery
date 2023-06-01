import { CartService } from "./cart.service";
import { Product } from "../product/product.entity";
type temporalUserIdWithProductIdDto = {
    userId: string;
    productId: string;
};
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    deleteProductFromCart(deleteProductDto: temporalUserIdWithProductIdDto): Promise<Product>;
    decreaseProducts(decreaseProductDto: temporalUserIdWithProductIdDto): Promise<void>;
    getAllProducts(userId: string): Promise<Product[]>;
    addProductToCart(addProductToCartDto: temporalUserIdWithProductIdDto): Promise<Product>;
}
export {};
