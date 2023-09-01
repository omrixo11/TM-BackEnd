import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class NestConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('config.name');
  }
  get env(): string {
    return this.configService.get<string>('config.env');
  }
  get url(): string {
    return this.configService.get<string>('config.url');
  }
  get port(): number {
    return Number(this.configService.get<number>('config.port'));
  }
  get serviceMailer(): string {
    return this.configService.get<string>('config.serviceMailer');
  }
  get ocr(): string {
    return this.configService.get<string>('config.ocr');
  }
  get preValidatorEmail(): string {
    return this.configService.get<string>('config.preValidatorEmail');
  }
  get allowedOrigins(): string {
    return this.configService.get<string>('config.allowedOrigins');
  }
  get smsKey(): string {
    return this.configService.get<string>('config.smsKey');
  }
  get linkShortener(): string {
    return this.configService.get<string>('config.linkShortener');
  }
  get validationFront(): string {
    return this.configService.get<string>('config.validationFront');
  }
  get broker(): string {
    return this.configService.get<string>('config.broker');
  }
  get clientSaintGobain(): string {
    return this.configService.get<string>('config.clientSaintGobain');
  }
  get storageBucket(): string {
    return this.configService.get<string>('config.storageBucket');
  }
  get departmentAddress(): string {
    return this.configService.get<string>('config.departmentAddress');
  }
  get maintenanceAddress(): string {
    return this.configService.get<string>('config.maintenanceAddress');
  }
  get RTEEmailInvoices(): string {
    return this.configService.get<string>('config.RTEEmailInvoices');
  }
  get RTEEmail(): string {
    return this.configService.get<string>('config.RTEEmail');
  }
  get FATECEmailInvoices(): string {
    return this.configService.get<string>('config.FATECEmailInvoices');
  }
}
