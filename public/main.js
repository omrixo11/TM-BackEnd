"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const port = 5001;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(port, () => {
        common_1.Logger.log(`is running on http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map