import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @ApiProperty({ example: 'Jinx - Crumb', description: 'Альбом - Исполнитель' })
  name: string;
  @Column()
  @ApiProperty({ example: '2019 - Portland', description: 'Год - Издатель' })
  desc: string;
  @Column()
  @ApiProperty({ example: 1999, description: 'Стоимость' })
  price: number;
  @Column()
  @ApiProperty({ example: 1, description: 'Наличие (1/0)', required: false })
  inStock?: boolean;

  @ApiProperty({
    example: [1, 2],
    description: 'Список id заказов, включающих продукт',
    required: false,
  })
  @ManyToMany(() => Order, (order) => order.products) //Создадим связь многие ко многим с сущностью Order и свяжем с полем products в заказах
  orders: Order[]; //объект, в котором будем автоматически получать все заказы продукта
}
