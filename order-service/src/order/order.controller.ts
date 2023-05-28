import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('order_create')
  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_get_by_id')
  async getOrder(id: string) {
    try {
      return await this.orderService.getOrderById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_get_all')
  async getAllOrders() {
    try {
      return await this.orderService.getAllOrders();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_get_all_by_id')
  async getAllOrdersById(id) {
    try {
      return await this.orderService.getAllOrdersByID(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_update')
  async updateOrder(updateOrderDto: UpdateOrderDto) {
    try {
      return await this.orderService.updateOrder(
        updateOrderDto.id,
        updateOrderDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_cancel')
  async cancelOrder(data: { orderId: string; ownerId: string }) {
    try {
      return await this.orderService.cancelOrderByUser(
        data.orderId,
        data.ownerId,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('order_delete')
  async deleteOrder(id: string) {
    try {
      return await this.orderService.deleteOrderById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
