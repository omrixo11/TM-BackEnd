import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { User } from './user.schemas';
import { Livreur } from './livreur.schemas';
import {Product} from './product.schemas'

export type OrderDocument = HydratedDocument<Order>;

export enum Etat {
    EnAttente = 'En Attente',
    EnCours = 'En cours',
    Annuler = 'Annuler',
    Livrer = 'Livrer'
}

export enum ModePayment {
    CartBancaire = 'CartBancaire',
    Espece = 'Espece',
    Cheque = 'Cheque',
}

@Schema({ timestamps: true })
export class Order {

    @Prop({})
    createdAt: Date;

    @Prop({})
    updatedAt: Date;

    @Prop([
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: Product.name }, // Reference the 'Product' model
            quantity: { type: Number, default: 1 },
        }
    ])
    product: { product: Types.ObjectId, quantity: number }[]; // Make sure 'products' references the correct model

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: Types.ObjectId[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livreur' }] })
    livreur: Types.ObjectId;

    @Prop({ enum: Etat, default: Etat.EnAttente })
    etat: Etat;

    @Prop({})
    prix: number;

    @Prop({ enum: ModePayment, required: true })
    typePayment: ModePayment;

}

export const OrderSchema = SchemaFactory.createForClass(Order);

