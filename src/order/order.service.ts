import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schemas';
import { OrderDocument } from 'src/schemas/order.schemas';
import { UpdateOrderDto } from './dto/update-order.dto';
import { startOfDay, endOfDay, format } from 'date-fns';
import { Etat } from 'src/schemas/order.schemas';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { Livreur, LivreurDocument } from 'src/schemas/livreur.schemas';
import { LivreurService } from 'src/livreur/livreur.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'public/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host:
    "smtp.office365.com",
  port: 587,
  secure:
    false,
  auth: {
    user: 'tunis.market@outlook.com',
    pass: 'daliTunisMarket1',
  },
});

function getDateToday() {
  const today = new Date();
  return {
    startOfDay: startOfDay(today),
    endOfDay: endOfDay(today),
    formattedDate: format(today, 'yyyy-MM-dd'),
  };
}

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private livreurService: LivreurService,
    private readonly userService: UsersService,

  ) { }

  async create(orderData: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new this.orderModel(orderData);
      const result = await newOrder.save();
      console.log(result, 'res');

      await result.populate('user')
      await this.sendOrderConfirmationEmail(result);
      return result;

    } catch (err) {
      throw new NotFoundException();
    }
  }

  async findAll(): Promise<Order[]> {

    return this.orderModel.find().populate('user')
      .populate('product.product')
      .populate('livreur').exec();
  }

  async findOne(id: string): Promise<Order | null> {
    const order = await this.orderModel
      .findById(id)
      // .populate('user')
      // .populate('livreur')
      .populate('product')
      // .populate({
      //   path: 'products.product', // Populate the 'product' field within 'products'
      // })
      .exec();

    console.log('Populated Order:', order);

    return order;
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

    const livreur = await this.livreurService.findById(idLivreur);
    if (!livreur) {
      throw new NotFoundException(`Livreur with ID ${idLivreur} not found`);
    }
    const livreurEmail = livreur.email;
    console.log("email:", livreurEmail);


    const livreurObjectId = new Types.ObjectId(idLivreur);

    order.livreur = livreurObjectId;

    const updatedOrder = await order.save();


    await updatedOrder.populate('user');
    await updatedOrder.populate('livreur');

    const orderText = `Order ID: ${updatedOrder._id}\n`;
    const productsText = updatedOrder.product.map((item) => `Produit: ${item.product}, Qte: ${item.quantity}`).join('\n');
    const orderDetailsText = `Detaille commande:\n${productsText}\nPrix Totale: ${updatedOrder.prix}.000 DT`;
    const emailText = `Nouveau commande:\n${orderText}\n${orderDetailsText}`;

    const mailOptions = {
      from: 'tunis.market@outlook.com', // Sender email 
      to: livreurEmail, // Livreur email
      subject: 'Nouveau commande',
      text: emailText,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return updatedOrder;
  }


  async calculateTotalOrdersPrice(): Promise<number> {
    const { startOfDay, endOfDay, formattedDate } = getDateToday();

    try {
      const orders = await this.orderModel
        .find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .exec();

      let totalPrice = 0;

      for (const order of orders) {
        totalPrice += order.prix;
      }

      console.log('Total Price:', totalPrice);

      return totalPrice;
    } catch (err) {
      console.error('Error calculating total orders price:', err);
      // throw new InternalServerErrorException('Error calculating total orders price');
    }
  }

  async sendOrderConfirmationEmail(order: any): Promise<void> {
    const userEmail = order?.user[0].email; // Replace with the actual path to user's email
    const orderText = `Order ID: ${order?.id}\n`;
    const productsText = order.product?.map((item) => `Produit: ${item.product}, Qte: ${item.quantity}`).join('\n');
    const orderDetailsText = `Detaille commande:\n${productsText}\nPrix Totale: ${order?.prix}.000 DT`;
    const emailText = `Nouveau commande:\n${orderText}\n${orderDetailsText}`;
    console.log(userEmail, 'userEmail',);

    const mailOptions = {
      from: 'tunis.market@outlook.com',
      to: userEmail,
      subject: 'Confirmation de commande',
      text: emailText,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Confirmation sent to:', userEmail);
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw new InternalServerErrorException('Failed to send order confirmation email');
    }
  }
  async calculateNotDeliveredOrdersCount(): Promise<number> {
    try {
      const notDeliveredOrdersCount = await this.orderModel
        .count({ etat: Etat.EnAttente })
        .exec();
      return notDeliveredOrdersCount;
    } catch (err) {
      console.error('Error calculating not delivered orders count:', err);
      throw new NotFoundException('Failed to calculate not delivered orders count');
    }
  }

  async calculateEnCoursOrdersCount(): Promise<number> {
    try {
      const enCoursOrdersCount = await this.orderModel
        .count({ etat: Etat.EnCours })
        .exec();
      return enCoursOrdersCount;
    } catch (err) {
      console.error('Error calculating not delivered orders count:', err);
      throw new NotFoundException('Failed to calculate not delivered orders count');
    }
  }

  async calculateLivredOrdersCount(): Promise<number> {
    try {
      const livredOrdersCount = await this.orderModel
        .count({ etat: Etat.Livrer })
        .exec();
      return livredOrdersCount;
    } catch (err) {
      console.error('Error calculating not delivered orders count:', err);
      throw new NotFoundException('Failed to calculate not delivered orders count');
    }
  }

  async calculateMostOrderedProducts(): Promise<{ product: string; totalQuantity: number }[]> {
    const pipeline: any[] = [
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.product",
          totalQuantity: { $sum: "$product.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          product: "$productInfo.name",
          totalQuantity: 1,
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
    ];

    const mostOrderedProducts = await this.orderModel.aggregate<{ product: string; totalQuantity: number }>(pipeline).exec();

    console.log("Most Ordered Products:", mostOrderedProducts);

    return mostOrderedProducts;

  }

  async calculateMostOrderedCategories(): Promise<{ category: string; totalQuantity: number }[]> {
    const pipeline: any[] = [
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "products",
          localField: "product.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo.name",
          totalQuantity: { $sum: "$product.quantity" },
        },
      },
      {
        $project: {
          category: "$_id",
          totalQuantity: 1,
          _id: 0,
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
    ];

    const mostOrderedCategories = await this.orderModel.aggregate<{ category: string; totalQuantity: number }>(pipeline).exec();

    console.log("Most Ordered Categories:", mostOrderedCategories);

    return mostOrderedCategories;
  }

  async getOrdersByWeekdays(): Promise<{ dayOfWeek: number; orderCount: number }[]> {
    const pipeline: any[] = [
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          orderCount: { $sum: 1 },
        },
      },
      {
        $project: {
          dayOfWeek: '$_id',
          orderCount: 1,
          _id: 0,
        },
      },
      {
        $sort: { dayOfWeek: 1 },
      },
    ];

    const ordersByWeekdays = await this.orderModel.aggregate<{ dayOfWeek: number; orderCount: number }>(pipeline).exec();

    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    const result = ordersByWeekdays.map((item) => ({
      dayOfWeek: item.dayOfWeek,
      dayName: dayNames[item.dayOfWeek - 1],
      orderCount: item.orderCount,
    }));

    return result;
  }

  private apiUrl = 'https://api.preprod.konnect.network/api/v2/'; // or 'https://api.konnect.network/api/v2' for production

  async initPayment(paymentData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/payments/init-payment`, paymentData, {
        headers: {
          'x-api-key': '64ff797847bb62fc99b7e3fe:9BfIuEhwty1L33bCJ7t', // Replace with your API key
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/payments/${paymentId}`, {
        headers: {
          'x-api-key': '64ff797847bb62fc99b7e3fe:9BfIuEhwty1L33bCJ7t', // Replace with your API key
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}