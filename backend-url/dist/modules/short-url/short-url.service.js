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
exports.ShortUrlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const short_url_schema_1 = require("../../schemas/short-url.schema.");
const mongoose_2 = require("mongoose");
const crypto_1 = require("crypto");
const user_service_1 = require("../user/user.service");
const moment = require("moment");
let ShortUrlService = class ShortUrlService {
    constructor(shortUrlModel, userService) {
        this.shortUrlModel = shortUrlModel;
        this.userService = userService;
    }
    async createUrl(user, url) {
        try {
            const shortUrl = await this.shortUrlModel.create({
                code: crypto_1.randomBytes(2).toString('hex'),
                original: url,
                user: user.id,
                createdAt: moment().toDate()
            });
            const urlFrontEnd = `${process.env.URL_FRONTEND}/${shortUrl.code}`;
            return urlFrontEnd;
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException(JSON.stringify(err));
        }
    }
    async getMyUrls({ id }) {
        const user = await this.userService.findUserById(id);
        const urls = await this.shortUrlModel.find({
            user
        })
            .select('_id code original createdAt')
            .sort('-createdAt');
        urls.forEach(url => {
            url.code = `${process.env.URL_FRONTEND}/${url.code}`;
        });
        return urls;
    }
    async getUrlByCode(code) {
        const url = await this.shortUrlModel.findOne({
            code
        })
            .select('_id code original createdAt');
        return url;
    }
};
ShortUrlService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(short_url_schema_1.ShortUrl.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], ShortUrlService);
exports.ShortUrlService = ShortUrlService;
//# sourceMappingURL=short-url.service.js.map