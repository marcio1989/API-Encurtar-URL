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
const user_schema_1 = require("../../schemas/user.schema");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async singIn(authCredentialsDto) {
        const user = await this.userService.validateUser(authCredentialsDto);
        user.password = undefined;
        const token = this.getToken(user);
        return { user, token };
    }
    async singUp(authCredentialsDto) {
        const user = await this.userService.createUser(authCredentialsDto);
        user.password = undefined;
        const token = this.getToken(user);
        return { user, token };
    }
    getToken(user) {
        const payload = {
            id: user.id,
            nick: user.nick
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map