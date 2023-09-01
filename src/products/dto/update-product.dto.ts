import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    name: string
  description: string
  price: number
  currency: string
  promo : boolean
  promoprice : number
  category: string
  subCategory: string
  brand: string
  tags: [string]
  imageUrls: [string]
  createdAt: Date
  updatedAt: Date
}
