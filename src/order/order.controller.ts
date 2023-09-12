import { Controller, Get, Post, Body, Req, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import axios from 'axios'

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('init-payment')
  async initPayment(@Body() paymentData: any): Promise<any> {
    const paymentResponse = await this.orderService.initPayment(paymentData);
    return paymentResponse;
  }

  @Get('payment-details/:paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: string): Promise<any> {
    const paymentDetails = await this.orderService.getPaymentDetails(paymentId);
    return paymentDetails;
  }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
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

    @Get('orders-by-weekdays')
    async getOrdersByWeekdays() {
        try {
            const ordersByWeekdays = await this.orderService.getOrdersByWeekdays();
            return ordersByWeekdays;
        } catch (error) {
            console.error('Error getting orders by weekdays:', error);
            throw new InternalServerErrorException('Error getting orders by weekdays');
        }
    }

    @Get('most-ordered-categories')
    async getMostOrderedCategories() {
        try {
            const mostOrderedCategories = await this.orderService.calculateMostOrderedCategories();
            return mostOrderedCategories;
        } catch (error) {
            console.error('Error calculating most ordered categories:', error);
            throw new InternalServerErrorException('Error calculating most ordered categories');
        }
    }

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get('most-ordered')
    async getMostOrderedProducts() {
        try {
            const mostOrderedProducts = await this.orderService.calculateMostOrderedProducts();
            return mostOrderedProducts;
        } catch (error) {
            console.error('Error calculating most ordered products:', error);
            throw new InternalServerErrorException('Error calculating most ordered products');
        }
    }


    @Get('livred-count')
    async getLivredOrdersCount(): Promise<{ count: number }> {
        const livredOrdersCount = await this.orderService.calculateLivredOrdersCount();
        return { count: livredOrdersCount };
    }

    @Get('en-cours-count')
    async getEnCoursOrdersCount(): Promise<{ count: number }> {
        const enCoursOrdersCount = await this.orderService.calculateEnCoursOrdersCount();
        return { count: enCoursOrdersCount };
    }

    @Get('not-delivered-count')
    async getNotDeliveredOrdersCount(): Promise<{ count: number }> {
        const notDeliveredOrdersCount = await this.orderService.calculateNotDeliveredOrdersCount();
        return { count: notDeliveredOrdersCount };
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

}