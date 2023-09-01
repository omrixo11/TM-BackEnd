import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  serviceMailer: process.env.ALLFLEET_MAILER_URL,
  ocr: process.env.ALLFLEET_OCR_URL,
  preValidatorEmail: process.env.ALLFLEET_PREVALIDATOR_EMAIL,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  smsKey: process.env.SMS_KEY,
  linkShortener: process.env.LINK_SHORTENER,
  validationFront: process.env.ALLFLEET_FRONT_VALIDATION,
  broker: process.env.BROKER,
  clientSaintGobain: process.env.CLIENT_SAINT_GOBAIN,
  storageBucket: process.env.STORAGE_BUCKET_NAME,
  departmentAddress: process.env.TITI_DEPARTEMENT_53_ADDRESS,
  maintenanceAddress: process.env.TITI_MAINTENANCE_ADDRESS,
  RTEEmailInvoices: process.env.RTEEmailInvoices,
  RTEEmail: process.env.RTEEmail,
  FATECEmailInvoices: process.env.FATEC_EMAIL_INVOICES,
}));
