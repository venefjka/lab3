import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Order } from 'src/orders/order.entity';
import { Client } from 'src/clients/client.entity';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Product, Order, Client]),
  ],
})
export class CatalogModule {}
