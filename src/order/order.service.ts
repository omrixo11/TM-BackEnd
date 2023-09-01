import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { OrderDocument } from 'src/schemas/order.schemas';
import mongoose, { Types } from 'mongoose';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(orderData: Order): Promise<Order> {
    try {
      const newOrder = new this.orderModel(orderData);
      const result = await newOrder.save();
      return result;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('user').populate('livreur').exec();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).populate('user').populate('livreur').exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    const existingOrder = await this.orderModel.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    Object.assign(existingOrder, updateOrderDto);
    const updatedOrder = await existingOrder.save();
    return updatedOrder;
  }

  async remove(id: string): Promise<Order | null> {
    const removedOrder = await this.orderModel.findByIdAndDelete(id);
    if (!removedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return removedOrder;
  }

  async assignLivreur(idLivreur: string, idOrder: string): Promise<Order | null> {
    const order = await this.orderModel.findById(idOrder).exec();

    if (!order) {
        throw new NotFoundException(`Order with ID ${idOrder} not found`);
    }

    const livreurObjectId = new mongoose.Types.ObjectId(idLivreur);

    order.livreur = livreurObjectId;

    const updatedOrder = await order.save();

    // Separate the populate calls and use exec() at the end of each
    await updatedOrder.populate('user')
    await updatedOrder.populate('livreur')

    return updatedOrder;
}

async calculateTotalOrdersPrice(): Promise<number> {
  console.log('test');
  
  const orders = await this.orderModel.find();
  let totalPrice = 0;

  for (const order of orders) {
    totalPrice +=  order.prix;
  }

  return totalPrice;
}

}
