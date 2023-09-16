import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
// import { User } from './user.schemas';
// import { Livreur } from './livreur.schemas';
// import {Product} from './product.schemas'
export class Order {


    
    @Prop({})
    createdAt: Date;

    @Prop({})
    updatedAt: Date;

 
    product: { product: Types.ObjectId, quantity: number }[]; // Make sure 'products' references the correct model

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livreur' }] })
    livreur: Types.ObjectId;

   

    @Prop({})
    prix: number;



    
}
