import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column()
  name: string;
  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column()
  surname: string;
  @ApiProperty({ example: '89123456789', description: 'Телефон' })
  @Column()
  phoneNumber: string;
  @ApiProperty({ example: 'ivanov@mail.ru', description: 'Эл. почта' })
  @Column()
  email: string;
  @ApiProperty({
    example: 'г. Москва, ул. А, д. 1, кв. 1',
    description: 'г., ул., д., кв.',
  })
  @Column()
  address: string;

  @ApiProperty({
    example: [1, 2],
    description: 'Список id заказов клиента',
    required: false,
  })
  @OneToMany(() => Order, (order) => order.client, {
    cascade: true,
  })
  orders: Order[];
}
