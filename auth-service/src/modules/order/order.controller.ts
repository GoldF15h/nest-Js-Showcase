import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { AdminAuthGuard, UserAuthGuard } from '../auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @UseGuards(UserAuthGuard)
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @UseGuards(UserAuthGuard)
  @Get()
  async getAllOrders(@Request() req) {
    if (req.user.role === 'user') return await this.orderService.getAllOrders();
    if (req.user.role === 'admin')
      return await this.orderService.getAllOrdersByID(req.user.sub);
    throw new NotFoundException();
  }

  @UseGuards(UserAuthGuard)
  @Put()
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.updateOrder(
      updateOrderDto.id,
      updateOrderDto,
    );
  }

  @UseGuards(UserAuthGuard)
  @Put(':id')
  async cancelOrder(@Request() req, @Param('id') id: string) {
    const updatedOrder = await this.orderService.cancelOrderByUser(
      id,
      req.user.sub,
    );
    if (!updatedOrder) throw new NotFoundException();
    return updatedOrder;
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrderById(id);
  }
}
