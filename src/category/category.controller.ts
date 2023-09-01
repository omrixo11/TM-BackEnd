import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/schemas/category.schemas';
import mongoose from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryData: Category): Promise<Category> {
    
    return this.categoryService.createCategory(categoryData);
  }

  @Get()
  async getCategorys(): Promise<Category[]> {
    return this.categoryService.getCategorys();
  }

//SubCategory part to update get and delete 
@Patch('/:id/add-subcategory/:subcategoryId')
addSubCategory(@Param('id') id: string, @Param('subcategoryId') subcategoryId: string) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
  return this.categoryService.addSubCategory(id, subcategoryId);
}}
//remove Subcategory 
@Patch('/:id/remove-subcategory/:subcategoryId')
removeSubCategory(@Param('id') id: string, @Param('subcategoryId') subcategoryId: string) {
  // add this inside your route
if( !mongoose.Types.ObjectId.isValid(id) ) return false;
  return this.categoryService.removeSubCategory(id, subcategoryId);
}
@Get('/:id/subcategorys')
getSubCategorys(@Param('id') id: string) {
  
  // if( !mongoose.Types.ObjectId.isValid(productId) ) return false;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {console.log(id,'categoryID');
  return this.categoryService.getSubCategorys(id);}
}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') categoryId: string, @Body() categoryData: Category): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, categoryData);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string): Promise<Category> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
