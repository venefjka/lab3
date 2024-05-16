import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty()
  name: string;
  @Column()
  @ApiProperty()
  desc: string;
  @Column()
  @ApiProperty()
  price: number;
  @Column()
  @ApiProperty({ required: false })
  inStock?: boolean;

  @ManyToMany(() => Order, (order) => order.products) //Создадим связь многие ко многим с сущностью Order и свяжем с полем products в заказах
  orders: Order[]; //объект, в котором будем автоматически получать все заказы продукта
}
