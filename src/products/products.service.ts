import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schemas';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ObjectId } from 'mongodb';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>
   , private cloudinary: CloudinaryService
  ) {}

  async createProduct(productData: Product): Promise<Product> {
    const newProduct = new this.productModel(productData);
    const result = await newProduct.save()
    try{  
      const tab = {id:result.id,product:result}
    console.log(tab,'product')
    return  result.id;
    }
    catch(err){
      throw new NotFoundException();
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  
  //Upload image cloudinary 
  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
//add category and remove and getcategory

addCategory(id: string, categoryId: string) {
  return this.productModel.findByIdAndUpdate(
    id,
    { $addToSet: { category: categoryId } },
    { new: true },
  );
}
removeCategory(id: string, categoryId: string) {
  return this.productModel.findByIdAndUpdate(
    id,
    { $pull: { category: categoryId } },
    { new: true },
  );
}
async getCategorys(id: string) {
  console.log('trs')
  const cat = await this.productModel.findById(id);
  return cat.category;
}


  async findAll() {
    return this.productModel.find();
  }
  
  async getProductById(productId: string): Promise<Product> {
    return this.productModel.findById(productId).exec();
  }

  async updateProduct(productId: string, productData: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(productId, productData, { new: true }).exec();
  }

  async deleteProduct(productId: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(productId).exec();
  }

  async decrementStock(productId: string, quantity: number): Promise<Product> {
    try {
      // Find the product by ID
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      // Check if there is enough stock to decrement
      if (product.stock < quantity) {
        throw new BadRequestException(`Not enough stock for product with ID ${productId}`);
      }

      // Decrement the stock
      product.stock -= quantity;

      // Save the updated product
      const updatedProduct = await product.save();

      return updatedProduct;
    } catch (err) {
      throw err;
    }
  }
  
}
