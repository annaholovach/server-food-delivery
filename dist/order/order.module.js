"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./order.entity");
const cart_entity_1 = require("../cart/cart.entity");
const product_entity_1 = require("../product/product.entity");
const product_to_order_entity_1 = require("./product-to-order.entity");
const user_entity_1 = require("../user/user.entity");
const cart_module_1 = require("../cart/cart.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, cart_entity_1.Cart, product_entity_1.Product, product_to_order_entity_1.ProductToOrder, user_entity_1.User]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
        ],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map