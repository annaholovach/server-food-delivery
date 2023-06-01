import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CartService} from "./cart.service";
import {Product} from "../product/product.entity";

type temporalUserIdWithProductIdDto = { userId: string; productId: string };

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    public async deleteProductFromCart(
        @Body() deleteProductDto: temporalUserIdWithProductIdDto,
    ): Promise<Product> {
        return await this.cartService.deleteProductFromCart(
            deleteProductDto.productId,
            deleteProductDto.userId,
        );
    }

    public async decreaseProducts(
        @Body() decreaseProductDto: temporalUserIdWithProductIdDto,
    ) {
        return await this.cartService.decreaseProduct(
            decreaseProductDto.productId,
            decreaseProductDto.userId,
        );
    }

    @Get(':userId')
    public async getAllProducts(
        @Param('userId') userId: string,
    ): Promise<Product[]> {
        return await this.cartService.getAllProducts(userId);
    }

    @Post('addProductToCart')
    public async addProductToCart(
        @Body() addProductToCartDto: temporalUserIdWithProductIdDto,
    ): Promise<Product> {
        return await this.cartService.addProductToCarts(
            addProductToCartDto.productId,
            addProductToCartDto.userId,
        );
    }
}
