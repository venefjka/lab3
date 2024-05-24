import { Product } from 'src/catalog/product.entity';
import { Order } from './order.entity';
import { Injectable } from '@nestjs/common';
import { Client } from 'src/clients/client.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/OrderDTO';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // "внедряем" репозиторий Product в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Client в сервис
  ) {}

  async create(orderDto: CreateOrderDto): Promise<Order> {
    //получаем объект CreateOrderDto
    const order = this.orderRepository.create(); //создаем объект Order из репозитория
    order.status = orderDto.status; //заполняем поля объекта Order
    const products = await this.productRepository.findBy({
      //получаем массив product по id
      id: In(orderDto.products),
    });
    order.products = products;
    const client = await this.clientRepository.findOneBy({
      //получаем массив product по id
      id: orderDto.client,
    });
    order.client = client;
    await this.orderRepository.save(order); //сохраняем объект Order в БД
    return order; //возвращаем объект Order
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      //получаем связанные объекты
      relations: {
        products: true,
        client: true,
      },
    }); //получаем массив Order из БД
    return orders; //возвращаем массив Order
  }

  findOne(id: number): Promise<Order> {
    // Promise<Order> - указывает, что функция возвращает объект Order в виде Promise (c асинхронного потока)
    return this.orderRepository.findOne({
      //получаем объект Order по id
      where: { id }, //указываем условие поиска по id
      relations: { products: true, client: true }, //получаем связанные объекты
    });
  }

  async update(id: number, updatedOrder: Order) {
    //получаем объект Order для обновления по id
    const order = await this.orderRepository.findOne({ where: { id } }); //получаем объект Order по id из БД
    order.status = updatedOrder.status; //обновляем поля объекта Order
    order.products = updatedOrder.products;
    order.client = updatedOrder.client;
    await this.orderRepository.save(order); //сохраняем объект Order в БД
    return order; //возвращаем объект Order
  }

  remove(id: number) {
    this.orderRepository.delete({ id }); //удаляем объект Order из БД
  }
}
