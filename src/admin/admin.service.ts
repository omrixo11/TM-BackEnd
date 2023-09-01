import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from 'src/schemas/admin.schemas';
import { Model } from 'mongoose';
@Injectable()
export class AdminService {

  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(LoginAdminDto: LoginAdminDto): Promise<Admin> {
    const { email } = LoginAdminDto;
    const admin = await this.adminModel.findOne({ email });
    if (admin) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdAdmin = new this.adminModel(LoginAdminDto);
    await createdAdmin.save();
    return createdAdmin;
  }

  async findAll() {
    const admin = await this.adminModel.find({});
    if(admin)
    return admin ;
  }

  async findByLogin(UserDTO: LoginAdminDto) {
    const { email, password } = UserDTO;
    const admin = await this.adminModel.findOne({ email });
    console.log(admin,'test admin login')
    if (!admin) {
      throw new HttpException('Admin doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (password === admin.password) {
      return {status:200,message:"Valid Admin"}
    }
     else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }


}
