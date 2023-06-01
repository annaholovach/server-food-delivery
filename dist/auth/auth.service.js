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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginUserDto) {
        const user = await this.validateUser(loginUserDto);
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id };
        return { token: this.jwtService.sign(payload) };
    }
    async validateUser(loginUserDto) {
        const user = await this.userService.getUsersByEmail(loginUserDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException({ message: 'This user does`n exist' });
        }
        const passwordEquals = await bcrypt.compare(loginUserDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({ message: 'Wrong password or email' });
    }
    async register(registerUserDto) {
        const candidate = await this.userService.getUsersByEmail(registerUserDto.email);
        if (candidate) {
            throw new common_1.HttpException('User with this email already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(registerUserDto.password, 5);
        const user = await this.userService.register(Object.assign(Object.assign({}, registerUserDto), { password: hashPassword }));
        return this.generateToken(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map