import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { ProductSchema } from 'src/schemas/product.schemas';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
