import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';

@Controller('livreurs')
export class LivreurController {
  
  constructor(private readonly livreurService: LivreurService) {}

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
    return this.livreurService.findById(id); // Use findById method instead of findOne
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLivreurDto: UpdateLivreurDto) {
    return this.livreurService.update(id, updateLivreurDto); // Pass id as string
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.livreurService.remove(id); // Pass id as string
  }

  @Get('total-count')
  async getTotalLivreurCount(): Promise<{ total: number }> {
    const total = await this.livreurService.getTotalLivreurCount();
    return { total };
  }
  
}
