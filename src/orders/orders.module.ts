import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { OrderController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/catalog/product.entity';
import { Order } from 'src/orders/order.entity';
import { Client } from 'src/clients/client.entity';

@Module({
  controllers: [OrderController],
  providers: [OrdersService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Product, Order, Client]),
  ],
})
export class OrdersModule {}
