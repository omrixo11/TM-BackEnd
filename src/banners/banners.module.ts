import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Banner, BannerSchema } from 'src/schemas/banner.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }]),CloudinaryModule],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [BannersService],
})
export class BannersModule {}
