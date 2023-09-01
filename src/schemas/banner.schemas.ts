import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument ,Types} from 'mongoose';


export type BannerDocument = HydratedDocument<Banner>;

@Schema({ timestamps: true })
export class Banner {


  @Prop({ required: true,unique :true })
  name: string;

  @Prop()
  description: string;


  @Prop({default:false})
  promo : boolean;

  @Prop()
  promoprice : number;


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

export const BannerSchema = SchemaFactory.createForClass(Banner);

// 
