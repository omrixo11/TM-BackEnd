/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { LoginDTO } from '../auth/dto/login.dto';
import { Payload } from 'src/types/payload';
import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(RegisterDTO: RegisterDTO): Promise<User>;
    sanitizeUser(user: User): any;
    findByLogin(UserDTO: LoginDTO): Promise<any>;
    findByPayload(payload: Payload): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>> & Omit<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>>;
    updateToken(payload: Payload, token: string): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<User>;
}
