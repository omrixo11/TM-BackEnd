import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true, unique: true })
  name: string;
  
  @Prop()
  description: string;

  @Prop({ default: '' })
  subdeCategory: string;

  @Prop({})
  createdAt: Date;

  @Prop({})
  updatedAt: Date;


}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

// 
