"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const cart_controller_1 = require("./cart.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./cart.entity");
const product_entity_1 = require("../product/product.entity");
const user_entity_1 = require("../user/user.entity");
const product_to_cart_entity_1 = require("./product-to-cart.entity");
const product_module_1 = require("../product/product.module");
let CartModule = class CartModule {
};
CartModule = __decorate([
    (0, common_1.Module)({
        providers: [cart_service_1.CartService],
        controllers: [cart_controller_1.CartController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart, product_entity_1.Product, user_entity_1.User, product_to_cart_entity_1.ProductToCart]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
        ]
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map