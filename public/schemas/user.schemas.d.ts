import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    dateOfBirth: Date;
    companyName: string;
    companyAdress: string;
    matriculeFiscale: string;
    assujettieTVA: string;
    patente: string;
    RNE: string;
    profileImage: string;
    isVerified: boolean;
    verificationToken: string;
    resetPasswordToken: string;
    resetPasswordExpire: string;
    favoriteList: {
        type: string[];
        default: [];
    };
    adressLivraison: {
        type: string[];
        default: [];
    };
    historyOrder: {
        type: string[];
        default: [];
    };
    reviews: {
        type: string[];
        default: [];
    };
    newsletter: boolean;
    lastConnexion: Date;
    toObject: any;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
