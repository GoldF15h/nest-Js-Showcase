import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schemas';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Types.ObjectId> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return (await createdOrder.save())._id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrderById(orderId: string) {
    try {
      return this.orderModel.findOne(
        { _id: orderId, isDeleted: false },
        '-_id -__v',
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getAllOrders() {
    try {
      return this.orderModel.find({ isDeleted: false });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getAllOrdersByID(id: string) {
    try {
      return this.orderModel.find({ customer: id, isDeleted: false });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateOrder(
    orderId: string,
    newOrderData: UpdateOrderDto,
  ): Promise<Order> {
    try {
      return this.orderModel.findByIdAndUpdate(orderId, newOrderData, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancelOrderByUser(orderId: string, ownerId: string): Promise<Order> {
    try {
      return this.orderModel.findOneAndUpdate(
        { _id: orderId, customer: ownerId },
        { status: 'cancel' },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrderById(orderId: string): Promise<Order> {
    try {
      return this.orderModel.findByIdAndUpdate(
        orderId,
        { isDeleted: true },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
