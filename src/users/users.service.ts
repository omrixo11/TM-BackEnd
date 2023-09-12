import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../auth/dto/login.dto'
import { Payload } from 'src/types/payload';
import { RegisterDTO } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schemas';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schemas';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(RegisterDTO: RegisterDTO): Promise<User> {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  // return user object without password
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    console.log(user,'test user login')
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

     // the new methods
     async findByPayload(payload: Payload) {
      const { email } = payload;
      return await this.userModel.findOne({ email });
    }
   //update token with register
   async updateToken(payload: Payload, token: string) : Promise<User>{
    const { email } = payload;
    const userToken = await this.userModel.findOne({ email });
    return this.userModel.findByIdAndUpdate(userToken.id, {verificationToken:token}, { new: true }).exec();
   }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User| undefined> {
    return this.userModel.findOne({ email }).exec();
  }


  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }


  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

//WHISH LIST 
  async updateWhishList(id: string, productId: string): Promise<User> {

    return this.userModel.findByIdAndUpdate(id, 
        { $addToSet: { favoriteList: productId } },
        { new: true }).exec();
  }
//DELETE FROM WHISHLIST
removeFromWhishList(id: string, productId: string) {
  return this.userModel.findByIdAndUpdate(
    id,
    { $pull: { favoriteList: productId } },
    { new: true },
  );
}
//GET WHISHLIST
async getWhishList(id: string) {

  const wish = await this.userModel.findById(id);
  return wish.favoriteList;
}

// DELETE USER
  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async deactivateUser(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
  }
  
}







 

