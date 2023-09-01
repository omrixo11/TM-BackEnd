// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument, Types } from 'mongoose';
// import * as mongoose from 'mongoose';
// import { SubCategory } from './subcategory.schemas';

// export type CategoryDocument = HydratedDocument<Category>;

// @Schema({ timestamps: true })
// export class Category {
//   @Prop({ required: true, unique: true })
//   name: string;

//   @Prop()
//   description: string;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: SubCategory.name }], required: true })
//   subCategory: Types.ObjectId;

//   @Prop({})
//   createdAt: Date;

//   @Prop({})
//   updatedAt: Date;

// }

// export const CategorySchema = SchemaFactory.createForClass(Category);

// // 

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { SubCategory } from './subcategory.schemas';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: SubCategory.name }] })
  subCategory: Types.ObjectId[];

  @Prop({})
  createdAt: Date;

  @Prop({})
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

