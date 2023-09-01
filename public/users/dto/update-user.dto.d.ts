import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
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
}
export {};
