"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../../../schemas/user.schema");
exports.GetUser = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
});
//# sourceMappingURL=get-user.decorator.js.map