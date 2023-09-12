import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
export type LivreurDocument = HydratedDocument<Livreur>;

@Schema({ timestamps: true })
export class Livreur {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true, unique: true })
  tele: Number;

  @Prop({ required: true, unique: true })
  ID: Number;

  @Prop()
  dateOfBirth: Date;

  @Prop({ default: Date.now })
  lastConnexion: Date;
  toObject: any;

}

export const LivreurSchema = SchemaFactory.createForClass(Livreur);

LivreurSchema.pre('save', async function (next: any): Promise<any> {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
