import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/catalog/product.entity';
import { Client } from 'src/clients/client.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  status: string;

  @ManyToMany(() => Product, (product) => product.orders) //Создадим связь многие ко многим с сущностью Product и свяжем с полем orders в продуктах
  @JoinTable({
    name: 'product_order',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' }, //для связи с идентификатором заказа
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }, //для связи с идентификатором продукта
  })
  products: Product[]; //объект, в котором будем автоматически получать все продукты в заказе

  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'CASCADE',
  })
  client: Client;
}
