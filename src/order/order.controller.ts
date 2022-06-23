import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrder(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateItemInOrder(+id, updateOrderDto);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string, @Body() productId: string) {
    return this.orderService.removeItem(+id, +productId);
  }
}
