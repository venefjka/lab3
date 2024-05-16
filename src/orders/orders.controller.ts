import { OrdersService } from './orders.service';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { Order } from './order.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/OrderDTO';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiOperation({ summary: 'Получение перечня всех заказов' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о заказе' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о заказе' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrder: Order) {
    return this.orderService.update(+id, updateOrder);
  }

  @ApiOperation({ summary: 'Добавление нового заказа' })
  @Post()
  create(@Body() createOrder: CreateOrderDto) {
    return this.orderService.create(createOrder);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
