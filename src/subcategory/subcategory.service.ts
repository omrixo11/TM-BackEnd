import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubCategory } from 'src/schemas/subcategory.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubcategoryService {
  constructor(@InjectModel(SubCategory.name) private subcategoryModel: Model<SubCategory>) {}

  async createSubCategory(subcategoryData: SubCategory): Promise<SubCategory> {
    const newSubCategory = new this.subcategoryModel(subcategoryData);
    const result = await newSubCategory.save()
    try{  
      const tab = {id:result.id,subcategory:result}
    console.log(tab,'subCategoryproduct')
    return  result.id;
    }
    catch(err){
      throw new NotFoundException();
    }
  }

  
  async getSubCategorys(): Promise<SubCategory[]> {
    return this.subcategoryModel.find().exec();
  }

  // findAll() {
  //   return `This action returns all subcategory`;
  // }

  async findAll(): Promise<SubCategory[]> {
    try {
      return this.subcategoryModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Subcategories not found');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  async remove(id: string): Promise<SubCategory> {
    try {
      const deletedSubcategory = await this.subcategoryModel.findByIdAndRemove(id).exec();
      
      if (!deletedSubcategory) {
        throw new NotFoundException(`Subcategory with ID ${id} not found`);
      }
      
      return deletedSubcategory;
    } catch (error) {
      throw new NotFoundException(`Error deleting subcategory with ID ${id}`);
    }
  }
  
}
