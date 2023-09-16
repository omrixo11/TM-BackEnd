import { Controller, Get, Query, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schemas';
import { Product } from 'src/schemas/product.schemas';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express/multer';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Cloudinary 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadImageToCloudinary(file);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }
// add wish list 
   //wishlist part to update, get and delete 
 @Patch('/:id/add-wishlist/:productId')
 updateWhishList(@Param('id') id: string, @Param('productId') productId: string) {
   if (id.match(/^[0-9a-fA-F]{24}$/)) {
     // Yes, it's a valid ObjectId, proceed with `findById` call.
   return this.usersService.updateWhishList(id, productId);
 }}
  //remove Whishlist 
  @Patch('/:id/remove-wishlist/:productId')
  removeFromWhishList(@Param('id') id: string, @Param('productId') productId: string) {
    // add this inside your route
if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    return this.usersService.removeFromWhishList(id, productId);
  }

  //GET whishLIST
  @Get('/:id/whishList')
  getWhishList(@Param('id') id: string) {
    
    // if( !mongoose.Types.ObjectId.isValid(productId) ) return false;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return this.usersService.getWhishList(id);}
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch('/:id/deactivate')
deactivateUser(@Param('id') id: string) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return this.usersService.deactivateUser(id);
  }
}

}
