import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument ,Types} from 'mongoose';


export type BannerDocument = HydratedDocument<Banner>;

@Schema({ timestamps: true })
export class Banner {


  @Prop({ required: true,unique :true })
  bannerUrl: string;

  @Prop({ required: true,unique :true })
  name: string;

  @Prop()
  description: string;
  
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

// 
