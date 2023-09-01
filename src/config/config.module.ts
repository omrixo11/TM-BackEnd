// import * as Joi from '@hapi/joi';
// import { Module } from '@nestjs/common';
// import configuration from './configuration';
// import { NestConfigService } from './config.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// /**
//  * Import and provide app configuration related classes.
//  *
//  * @module
//  */
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       load: [configuration],
//       validationSchema: Joi.object({
//         APP_NAME: Joi.string().default('AllFleet Manager'),
//         NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
//         APP_PORT: Joi.number(),
//         ALLFLEET_MAILER_URL: Joi.string(),
//         ALLFLEET_OCR_URL: Joi.string(),
//         ALLFLEET_PREVALIDATOR_EMAIL: Joi.string(),
//         ALLOWED_ORIGINS: Joi.string(),
//         BROKER: Joi.string(),
//         CLIENT_SAINT_GOBAIN: Joi.string(),
//         STORAGE_BUCKET_NAME: Joi.string(),
//         LINK_SHORTENER: Joi.string(),
//         ALLFLEET_FRONT_VALIDATION: Joi.string(),
//         TITI_DEPARTEMENT_53_ADDRESS: Joi.string(),
//         TITI_MAINTENANCE_ADDRESS: Joi.string(),
//         RTEEmailInvoices: Joi.string(),
//         RTEEmail: Joi.string(),
//         FATECEmailInvoices: Joi.string(),
//       }),
//     }),
//   ],
//   providers: [ConfigService, NestConfigService],
//   exports: [ConfigService, NestConfigService],
// })
// export class NestConfigModule {}
