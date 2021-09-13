"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortUrlModule = void 0;
const common_1 = require("@nestjs/common");
const short_url_service_1 = require("./short-url.service");
const short_url_controller_1 = require("./short-url.controller");
const mongoose_1 = require("@nestjs/mongoose");
const short_url_schema_1 = require("../../schemas/short-url.schema.");
const config_1 = require("@nestjs/config");
const user_schema_1 = require("../../schemas/user.schema");
const user_service_1 = require("../user/user.service");
let ShortUrlModule = class ShortUrlModule {
};
ShortUrlModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([
                { name: short_url_schema_1.ShortUrl.name, schema: short_url_schema_1.ShortUrlSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ])
        ],
        providers: [short_url_service_1.ShortUrlService, user_service_1.UserService],
        controllers: [short_url_controller_1.ShortUrlController]
    })
], ShortUrlModule);
exports.ShortUrlModule = ShortUrlModule;
//# sourceMappingURL=short-url.module.js.map