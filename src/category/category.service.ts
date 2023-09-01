import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from 'src/schemas/category.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async createCategory(categoryData: Category): Promise<Category> {
    const newCategory = new this.categoryModel(categoryData);
    const result = await newCategory.save()
    try{  
      const tab = {id:result.id,category:result}
    console.log(tab,'product')
    return  result.id;
    }
    catch(err){
      throw new NotFoundException();
    }
  }

  
  async getCategorys(): Promise<Category[]> {
    // return this.categoryModel.find().exec();
    return this.categoryModel.find().populate('subCategory').exec();

  }

  //add Subcategory and remove and getsubcategory

addSubCategory(id: string, subcategoryId: string) {
  return this.categoryModel.findByIdAndUpdate(
    id,
    { $addToSet: { subCategory: subcategoryId } },
    { new: true },
  );
}
removeSubCategory(id: string, subcategoryId: string) {
  return this.categoryModel.findByIdAndUpdate(
    id,
    { $pull: { subCategory: subcategoryId } },
    { new: true },
  );
}
async getSubCategorys(id: string) {
  console.log('trs')
  const cat = await this.categoryModel.findById(id);
  return cat.subCategory;
}

  findAll() {
    return `This action returns all category`;
  }

  async getCategoryById(productId: string) {
    const cat = await this.categoryModel.findById(productId);
    return {name : cat.name,id : cat.id};
  }

  async updateCategory(productId: string, categoryData: Category): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(productId, categoryData, { new: true }).exec();
  }

  async deleteCategory(productId: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(productId).exec();
  }
}
