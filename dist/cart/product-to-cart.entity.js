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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductToCart = void 0;
const typeorm_1 = require("typeorm");
const cart_entity_1 = require("./cart.entity");
const product_entity_1 = require("../product/product.entity");
let ProductToCart = class ProductToCart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductToCart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.Cart, (cartsId) => cartsId.id),
    __metadata("design:type", cart_entity_1.Cart)
], ProductToCart.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { eager: true, cascade: true }),
    __metadata("design:type", product_entity_1.Product)
], ProductToCart.prototype, "product", void 0);
ProductToCart = __decorate([
    (0, typeorm_1.Entity)('carts_lists_products_products')
], ProductToCart);
exports.ProductToCart = ProductToCart;
//# sourceMappingURL=product-to-cart.entity.js.map