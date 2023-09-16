import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { OrderSchema } from 'src/schemas/order.schemas';
import { LivreurModule } from '../livreur/livreur.module'; // Import the LivreurModule here
import { UsersModule } from 'public/users/users.module';

@Module({
  
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    LivreurModule, // Import the LivreurModule here
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
