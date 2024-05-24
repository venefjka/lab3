//import { DatasourceService } from '../datasource/datasource.service';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/ClientDTO';
import { Product } from 'src/catalog/product.entity';
import { Order } from 'src/orders/order.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // "внедряем" репозиторий Product в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Client в сервис
  ) {}

  async create(clientDto: CreateClientDto): Promise<Client> {
    //получаем объект CreateCLientDto
    const client = this.clientRepository.create(); //создаем объект Client из репозитория
    client.name = clientDto.name; //заполняем поля объекта Client
    client.surname = clientDto.surname;
    client.phoneNumber = clientDto.phoneNumber;
    client.email = clientDto.email;
    client.address = clientDto.address;
    await this.clientRepository.save(client); //сохраняем объект Client в БД
    return client; //возвращаем объект Client
  }

  async findAll(): Promise<Client[]> {
    const authors = await this.clientRepository.find({
      //получаем связанные объекты
      relations: {
        orders: true,
      },
    }); //получаем массив Client из БД
    return authors; //возвращаем массив Client
  }

  findOne(id: number): Promise<Client> {
    // Promise<Client> - указывает, что функция возвращает объект Client в виде Promise (c асинхронного потока)
    return this.clientRepository.findOne({
      //получаем объект Client по id
      where: { id }, //указываем условие поиска по id
      relations: { orders: true }, //получаем связанные объекты
    });
  }

  async update(id: number, updatedClient: Client) {
    //получаем объект Client для обновления по id
    const client = await this.clientRepository.findOne({ where: { id } }); //получаем объект Client по id из БД
    client.name = updatedClient.name; //обновляем поля объекта Client
    client.surname = updatedClient.surname;
    client.phoneNumber = updatedClient.phoneNumber;
    client.email = updatedClient.email;
    client.address = updatedClient.address;
    client.orders = updatedClient.orders;
    await this.clientRepository.save(client); //сохраняем объект Client в БД
    return client; //возвращаем объект Client
  }

  remove(id: number) {
    this.clientRepository.delete({ id }); //удаляем объект Client из БД
  }
}
