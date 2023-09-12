// auth.service.ts
import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}
  
  async signPayload(payload: Payload) {
    return sign(payload, 'f54bb9e22016f45d8465edf0adb08289cab92bdf09315da46e904cba74e2245e9db617', { expiresIn: '60s' });
  }

  async validateUser(payload: Payload) {
    return await this.usersService.findByPayload(payload);
  }

}