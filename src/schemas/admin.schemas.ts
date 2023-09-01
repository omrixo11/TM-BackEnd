import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {

  @Prop({ required: true,unique :true })
  email: string;

  @Prop({ required: true })
  password: string;


}

export const AdminSchema = SchemaFactory.createForClass(Admin);


