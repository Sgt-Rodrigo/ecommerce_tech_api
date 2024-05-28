import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
 async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const response = await this.orderService.addOrder(createOrderDto);
      return response
    } catch (error) {
      throw error
    }
  }


  @Get(':id')
  async findOrderByID(@Param('id', ParseUUIDPipe) orderId: string) {
    try {
      const response = await this.orderService.getOrderByID(orderId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id', )
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}
