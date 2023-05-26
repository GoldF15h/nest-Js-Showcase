import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schemas';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async getOrderById(orderId: string) {
    return this.orderModel.findOne(
      { _id: orderId, isDeleted: false },
      '-_id -__v',
    );
  }

  async getAllOrders() {
    return this.orderModel.find({ isDeleted: false });
  }

  async deleteOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { isDeleted: true },
      { new: true },
    );
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(orderId, updateOrderDto, {
      new: true,
    });
  }
}
