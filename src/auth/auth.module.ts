// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
// import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
 
})
export class AuthModule {}