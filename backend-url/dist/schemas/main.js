"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(process.env.PORT);
    const PORT = process.env.PORT || 3001;
    console.log(`Listing in ${process.env.URL_BACKEBD}:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map