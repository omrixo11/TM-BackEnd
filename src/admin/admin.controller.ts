import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto} from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.create(loginAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const admin = await this.adminService.findByLogin(loginAdminDto);
  
    return { admin };
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }



}
