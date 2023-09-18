import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Controller('livreurs')
export class LivreurController {

  constructor(private readonly livreurService: LivreurService) { }

  @Post()
  create(@Body() createLivreurDto: CreateLivreurDto) {
    return this.livreurService.create(createLivreurDto);
  }

  @Get()
  findAll() {
    return this.livreurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.livreurService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLivreurDto: UpdateLivreurDto) {
    console.log(`Updating Livreur with ID: ${id}`,updateLivreurDto,"this is controller");
    const updatedLivreur = await this.livreurService.update(id, updateLivreurDto);
    if (!updatedLivreur) {
      throw new HttpException('Livreur not found', HttpStatus.NOT_FOUND);
    }
    return updatedLivreur;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.livreurService.remove(id);
  }

  @Get('total-count')
  async getTotalLivreurCount(): Promise<{ total: number }> {
    const total = await this.livreurService.getTotalLivreurCount();
    return { total };
  }

}
