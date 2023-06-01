"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../product/product.entity");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./cart.entity");
const typeorm_2 = require("typeorm");
const product_to_cart_entity_1 = require("./product-to-cart.entity");
let CartService = class CartService {
    constructor(cartRepository, productRepository, productToCartRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.productToCartRepository = productToCartRepository;
    }
    async deleteProductFromCart(productId, userId) {
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
    async decreaseProduct(productId, userId) {
        const cart = await this.cartRepository.findOne({ where: { userId } });
        const indexToDelete = cart.listsProducts.findIndex((x) => x.product.id === productId);
        if (indexToDelete <= 0) {
            throw new common_1.HttpException('You already exist decrease this product', common_1.HttpStatus.BAD_REQUEST);
        }
        cart.listsProducts.splice(indexToDelete, 1);
        const decreaseProduct = await this.productRepository.findOneById(productId);
        ++decreaseProduct.quantity;
        await this.productRepository.save(decreaseProduct);
        await this.cartRepository.save(cart);
    }
    async getAllProducts(userId) {
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
            },
        });
        return cart.listsProducts.map((x) => x.product);
    }
    async addProductToCarts(productId, userId) {
        const cart = await this.cartRepository.findOne({
            where: { userId },
        });
        if (!cart) {
            throw new common_1.HttpException('This cart does`n exist', common_1.HttpStatus.BAD_REQUEST);
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
        throw new common_1.HttpException('This product is out of stock', common_1.HttpStatus.BAD_REQUEST);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(product_to_cart_entity_1.ProductToCart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map