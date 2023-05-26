import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Put()
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.updateOrder(
      updateOrderDto.id,
      updateOrderDto,
    );
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrderById(id);
  }
}
