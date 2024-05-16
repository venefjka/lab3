import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExpressOrder extends Order {
  constructor(
    id: number,
    clientId: number,
    productId: number,
    status: string,
    deliveryTime: number,
  ) {
    super();
    this.deliveryTime = deliveryTime;
  }
  @ApiProperty()
  deliveryTime: number;
}
