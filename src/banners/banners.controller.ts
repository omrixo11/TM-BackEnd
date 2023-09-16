import { Controller, Get, Query, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from 'src/schemas/banner.schemas';
import { FileInterceptor } from '@nestjs/platform-express/multer';


@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) { }

  //Cloudinary 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.bannersService.uploadImageToCloudinary(file);
  }

  @Post('createBanner')
  async createBanner(@Body() bannerData: Banner): Promise<Banner> {

    return this.bannersService.createBanner(bannerData);
  }

  @Get()
  async getBanners(): Promise<Banner[]> {
    return this.bannersService.getBanners();
  }


  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannersService.update(id, updateBannerDto);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(+id);
  }
}
