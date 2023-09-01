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
exports.NestConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let NestConfigService = class NestConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get name() {
        return this.configService.get('config.name');
    }
    get env() {
        return this.configService.get('config.env');
    }
    get url() {
        return this.configService.get('config.url');
    }
    get port() {
        return Number(this.configService.get('config.port'));
    }
    get serviceMailer() {
        return this.configService.get('config.serviceMailer');
    }
    get ocr() {
        return this.configService.get('config.ocr');
    }
    get preValidatorEmail() {
        return this.configService.get('config.preValidatorEmail');
    }
    get allowedOrigins() {
        return this.configService.get('config.allowedOrigins');
    }
    get smsKey() {
        return this.configService.get('config.smsKey');
    }
    get linkShortener() {
        return this.configService.get('config.linkShortener');
    }
    get validationFront() {
        return this.configService.get('config.validationFront');
    }
    get broker() {
        return this.configService.get('config.broker');
    }
    get clientSaintGobain() {
        return this.configService.get('config.clientSaintGobain');
    }
    get storageBucket() {
        return this.configService.get('config.storageBucket');
    }
    get departmentAddress() {
        return this.configService.get('config.departmentAddress');
    }
    get maintenanceAddress() {
        return this.configService.get('config.maintenanceAddress');
    }
    get RTEEmailInvoices() {
        return this.configService.get('config.RTEEmailInvoices');
    }
    get RTEEmail() {
        return this.configService.get('config.RTEEmail');
    }
    get FATECEmailInvoices() {
        return this.configService.get('config.FATECEmailInvoices');
    }
};
NestConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NestConfigService);
exports.NestConfigService = NestConfigService;
//# sourceMappingURL=config.service.js.map