import { Module } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { Livreur , LivreurSchema } from 'src/schemas/livreur.schemas';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: Livreur.name, schema: LivreurSchema }])],
  controllers: [LivreurController],
  providers: [LivreurService],
  exports: [LivreurService],

})
export class LivreurModule {}
