import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Product} from "../product/product.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Cart} from "./cart.entity";
import {Repository} from "typeorm";
import {ProductToCart} from "./product-to-cart.entity";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(ProductToCart)
        private productToCartRepository: Repository<ProductToCart>,
        )
    {}

    public async deleteProductFromCart(
        productId: string,
        userId: string,
    ): Promise<Product> {
        const cart = await this.cartRepository.findOne({ where: { userId } });
        const deleteProduct = await this.productRepository.findOne({
            where: { id: productId },
        });

        const deleteProductToCart = await this.productToCartRepository.findOne({
            where: { product: deleteProduct },
        });

        cart.listsProducts = cart.listsProducts.filter((product) => {
            return product !== deleteProductToCart;
        });

        await this.cartRepository.save(cart);

        return deleteProduct;
    }

    public async decreaseProduct(
        productId: string,
        userId: string,
    ): Promise<void> {
        const cart = await this.cartRepository.findOne({ where: { userId } });

        const indexToDelete = cart.listsProducts.findIndex(
            (x) => x.product.id === productId,
        );

        if (indexToDelete <= 0) {
            throw new HttpException(
                'You already exist decrease this product',
                HttpStatus.BAD_REQUEST,
            );
        }

        cart.listsProducts.splice(indexToDelete, 1);

        const decreaseProduct = await this.productRepository.findOneById(productId);
        ++decreaseProduct.quantity;

        await this.productRepository.save(decreaseProduct);
        await this.cartRepository.save(cart);
    }

    public async getAllProducts(userId: string): Promise<Product[]> {
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
            },
        });

        return cart.listsProducts.map((x) => x.product);
    }

    public async addProductToCarts(
        productId: string,
        userId: string,
    ): Promise<Product> {
        const cart = await this.cartRepository.findOne({
            where: { userId },
        });

        if (!cart) {
            throw new HttpException(
                'This cart does`n exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (product.quantity >= 1) {
            --product.quantity;
            const newProductToCart = await this.productToCartRepository.save({
                cart,
                product,
            });
            await this.productRepository.save(product);
            cart.listsProducts.push(newProductToCart);
            await this.cartRepository.save(cart);
            return product;
        }

        throw new HttpException(
            'This product is out of stock',
            HttpStatus.BAD_REQUEST,
        );
    }

}
