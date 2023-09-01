import { Controller, Get, Post, Body, Patch, Param, Delete ,Put, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../schemas/product.schemas';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Post()
  async createProduct(@Body() productData: Product): Promise<Product> {
    
    return this.productsService.createProduct(productData);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

//Cloudinary 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
      return this.productsService.uploadImageToCloudinary(file);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }
  @Get(':id')
  async getProductById(@Param('id') productId: string): Promise<Product> {
    return this.productsService.getProductById(productId);
  }

  @Put(':id')
  async updateProduct(@Param('id') productId: string, @Body() productData: Product): Promise<Product> {
    return this.productsService.updateProduct(productId, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string): Promise<Product> {
    return this.productsService.deleteProduct(productId);
  }
 //Category part to update get and delete 
 @Patch('/:id/add-category/:categoryId')
  addCategory(@Param('id') id: string, @Param('categoryId') categoryId: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
    return this.productsService.addCategory(id, categoryId);
  }}
  //remove category 
  @Patch('/:id/remove-category/:categoryId')
  removeCategory(@Param('id') id: string, @Param('categoryId') categoryId: string) {
    // add this inside your route
if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    return this.productsService.removeCategory(id, categoryId);
  }
  @Get('/:id/categorys')
  getCategorys(@Param('id') id: string) {
    
    // if( !mongoose.Types.ObjectId.isValid(productId) ) return false;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {console.log(id,'prodID');
    return this.productsService.getCategorys(id);}
  }


}
