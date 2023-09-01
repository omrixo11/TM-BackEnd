import { ConfigService } from '@nestjs/config';
export declare class NestConfigService {
    private configService;
    constructor(configService: ConfigService);
    get name(): string;
    get env(): string;
    get url(): string;
    get port(): number;
    get serviceMailer(): string;
    get ocr(): string;
    get preValidatorEmail(): string;
    get allowedOrigins(): string;
    get smsKey(): string;
    get linkShortener(): string;
    get validationFront(): string;
    get broker(): string;
    get clientSaintGobain(): string;
    get storageBucket(): string;
    get departmentAddress(): string;
    get maintenanceAddress(): string;
    get RTEEmailInvoices(): string;
    get RTEEmail(): string;
    get FATECEmailInvoices(): string;
}
