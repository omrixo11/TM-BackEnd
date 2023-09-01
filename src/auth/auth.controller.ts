// auth.controller.ts

import { AuthGuard } from '@nestjs/passport';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDTO } from '../users/dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService ,
    private usersService: UsersService
    ) {}
  
    @Get("/onlyauth")
    @UseGuards(AuthGuard("jwt"))
    
     async hiddenInformation(){
       return  "hidden information";
     }
     
  
     @Get("/anyone")

     async publicInformation(){
     return  "this can be seen by anyone";
     }


    @Post('register')
    async register(@Body() RegisterDTO: RegisterDTO) {
      const user = await this.usersService.create(RegisterDTO);
      const payload = {
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      //save token in DATABASE
      await this.usersService.updateToken(payload,token);
      console.log({ user, token },'token user')
      return { user, token };
    }

    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
      const user = await this.usersService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }
}