import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from '../schemas/banner.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class BannersService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>
  , private cloudinary: CloudinaryService
 ) {}
 
 async createBanner(bannerData: Banner): Promise<Banner> {
  const newBanner = new this.bannerModel(bannerData);
  const result = await newBanner.save()
  try{  
    const tab = {id:result.id,banner:result}
  console.log(tab,'Banners')
  return  result.id;
  }
  catch(err){
    throw new NotFoundException();
  }
}


async getBanners(): Promise<Banner[]> {
  return this.bannerModel.find().exec();
}


  //Upload image cloudinary 
  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  findAll() {
    return `This action returns all banners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
