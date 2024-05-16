import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Создан', description: 'Статус заказа' })
  status: string;
  @ApiProperty({ example: [1, 2], description: 'Список id продуктов в заказе' })
  products: number[];
  @ApiProperty({ example: 1, description: 'Id клиента, сделавшего заказ' })
  client: number;
}
