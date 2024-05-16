import { Injectable } from '@nestjs/common';
import { Product } from 'src/catalog/product.entity';
import { Order } from 'src/orders/order.entity';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class DatasourceService {
  private catalog: Product[];
  private clients: Client[];
  private orders: Order[];

  getCatalog(): Product[] {
    return this.catalog;
  }

  getClients(): Client[] {
    return this.clients;
  }

  getOrders(): Order[] {
    return this.orders;
  }
}
