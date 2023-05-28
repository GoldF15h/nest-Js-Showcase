import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schemas';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('ORDER') private orderClient: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Types.ObjectId> {
    try {
      const orderResponse$ = this.orderClient.send(
        'order_create',
        createOrderDto,
      );
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrderById(orderId: string) {
    try {
      const orderResponse$ = this.orderClient.send('order_get_by_id', orderId);
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrders() {
    try {
      const orderResponse$ = this.orderClient.send('order_get_all', {});
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllOrdersByID(id: string) {
    try {
      const orderResponse$ = this.orderClient.send('order_get_all_by_id', id);
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateOrder(newOrderData: UpdateOrderDto): Promise<Order> {
    try {
      const orderResponse$ = this.orderClient.send(
        'order_update',
        newOrderData,
      );
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async cancelOrderByUser(orderId: string, ownerId: string): Promise<Order> {
    try {
      const orderResponse$ = this.orderClient.send('order_cancel', {
        orderId,
        ownerId,
      });
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOrderById(orderId: string): Promise<Order> {
    try {
      const orderResponse$ = this.orderClient.send('order_delete', orderId);
      return await lastValueFrom(orderResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
