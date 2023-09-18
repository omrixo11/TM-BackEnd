import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Livreur, LivreurDocument } from 'src/schemas/livreur.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import { RegisterLivreurDTO } from './dto/register.dto';

@Injectable()
export class LivreurService {
  constructor(@InjectModel(Livreur.name) private livreurModel: Model<LivreurDocument>) {}

  async create(RegisterDTO: RegisterLivreurDTO): Promise<Livreur> {
    const { email } = RegisterDTO;
    const livreur = await this.livreurModel.findOne({ email });
    if (livreur) {
      throw new HttpException('Livreur already exists', HttpStatus.BAD_REQUEST);
    }
    const createdLivreur = new this.livreurModel(RegisterDTO);
    await createdLivreur.save();
    return this.sanitizeLivreur(createdLivreur);
  }

  async findAll(): Promise<Livreur[]> {
    return this.livreurModel.find().exec();
  }

  async findById(id: string): Promise<Livreur> {
    return this.livreurModel.findById(id).exec();
  }

  

  async update(id: string, updateLivreurDto: UpdateLivreurDto): Promise<Livreur> {
    console.log(`Updating Livreur with ID: ${id}`);
    const existingLivreur = await this.livreurModel.findById(id);
    if (!existingLivreur) {
      throw new HttpException('Livreur not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(existingLivreur, updateLivreurDto);
    await existingLivreur.save();
    console.log(existingLivreur,"livreurexisting",updateLivreurDto);

    return this.sanitizeLivreur(existingLivreur);
  }

  async remove(id: string): Promise<Livreur> {
    const removedLivreur = await this.livreurModel.findByIdAndDelete(id);
    if (!removedLivreur) {
      throw new HttpException('Livreur not found', HttpStatus.NOT_FOUND);
    }
    return this.sanitizeLivreur(removedLivreur);
  }

  // Return livreur object without sensitive information
  private sanitizeLivreur(livreur: Livreur): Livreur {
    const sanitizedLivreur = livreur.toObject();
    delete sanitizedLivreur.password;
    return sanitizedLivreur;

  }

  //calcul
   async getTotalLivreurCount(): Promise<number> {
    const totalLivreurCount = await this.livreurModel.estimatedDocumentCount();
    return totalLivreurCount;
  }
}
