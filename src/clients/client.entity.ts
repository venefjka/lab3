import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  surname: string;
  @ApiProperty()
  @Column()
  phoneNumber: string;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.client, {
    cascade: true,
  })
  orders: Order[];
}
