import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get('calculate-total-price')
    async calculateTotalPrice() {
      try {
        const totalPrice = await this.orderService.calculateTotalOrdersPrice();
        return { totalPrice };
      } catch (error) {
        console.error('Error calculating total price:', error);
        throw new InternalServerErrorException('Error calculating total price');
      }
    }

    @Get(':id') // This is the unique implementation of findOne
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }

    @Patch(':id/assign-livreur/:livreurId')
    assignLivreur(@Param('id') orderId: string, @Param('livreurId') livreurId: string) {
        return this.orderService.assignLivreur(livreurId, orderId);
    }

    //stats
  

}