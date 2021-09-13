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
exports.ShortUrlController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const create_short_url_dto_1 = require("./dtos/create-short-url.dto");
const short_url_service_1 = require("./short-url.service");
let ShortUrlController = class ShortUrlController {
    constructor(shortUrlService) {
        this.shortUrlService = shortUrlService;
    }
    async createUrl({ url }, user) {
        return this.shortUrlService.createUrl(user, url);
    }
    async getMyUrls(user) {
        return this.shortUrlService.getMyUrls(user);
    }
    async getUrlByCode(code) {
        return this.shortUrlService.getUrlByCode(code);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post(''),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_short_url_dto_1.ShortUrlDto, Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "createUrl", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(''),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "getMyUrls", null);
__decorate([
    common_1.Get('/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShortUrlController.prototype, "getUrlByCode", null);
ShortUrlController = __decorate([
    common_1.Controller('short-url'),
    __metadata("design:paramtypes", [short_url_service_1.ShortUrlService])
], ShortUrlController);
exports.ShortUrlController = ShortUrlController;
//# sourceMappingURL=short-url.controller.js.map