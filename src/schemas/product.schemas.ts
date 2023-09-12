import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument ,Types} from 'mongoose';
import { Category } from './category.schemas';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {


  @Prop({ required: true,unique :true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({default:false})
  promo : boolean;

  @Prop()
  promoprice : number;

  @Prop()
  stock : number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],required:true })
  category: Types.ObjectId ;

  @Prop({ default: '' })
  subCategory: string;

  @Prop({ default: '' })
  brand: string;

  @Prop({ })
  tags: [string];

  @Prop({ required: true })
  imageUrls: [string];

  @Prop({ })
  createdAt: Date;

  @Prop({})
  updatedAt: Date;


}

export const ProductSchema = SchemaFactory.createForClass(Product);

// 
