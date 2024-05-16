import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/catalog/product.entity';
import { Order } from 'src/orders/order.entity';
import { Client } from 'src/clients/client.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Product, Order, Client]),
  ],
})
export class ClientsModule {}
