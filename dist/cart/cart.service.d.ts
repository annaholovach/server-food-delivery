import { Product } from "../product/product.entity";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { ProductToCart } from "./product-to-cart.entity";
export declare class CartService {
    private cartRepository;
    private productRepository;
    private productToCartRepository;
    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>, productToCartRepository: Repository<ProductToCart>);
    deleteProductFromCart(productId: string, userId: string): Promise<Product>;
    decreaseProduct(productId: string, userId: string): Promise<void>;
    getAllProducts(userId: string): Promise<Product[]>;
    addProductToCarts(productId: string, userId: string): Promise<Product>;
}
