import { InjectRepository } from '@nestjs/typeorm';
import { IncompleteProductDto } from './dto/incomplete-product.dto';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/ProductDTO';
import { Order } from 'src/orders/order.entity';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>, // "внедряем" репозиторий Order в сервис
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // "внедряем" репозиторий Product в сервис
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>, // "внедряем" репозиторий Client в сервис
  ) {}

  async create(productDto: CreateProductDto): Promise<Product> {
    //получаем объект CreateProductDto
    const product = this.productRepository.create(); //создаем объект Product из репозитория
    product.name = productDto.name; //заполняем поля объекта Product
    product.desc = productDto.desc;
    product.price = productDto.price;
    product.inStock = productDto.inStock;
    await this.productRepository.save(product); //сохраняем объект Product в БД
    return product; //возвращаем объект Product
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      //получаем связанные объекты
      relations: {
        orders: true,
      },
    }); //получаем массив Product из БД
    return products; //возвращаем массив Product
  }

  findOne(id: number): Promise<Product> {
    // Promise<Product> - указывает, что функция возвращает объект Product в виде Promise (c асинхронного потока)
    return this.productRepository.findOne({
      //получаем объект Product по id
      where: { id }, //указываем условие поиска по id
      relations: { orders: true }, //получаем связанные объекты
    });
  }

  async findIncomplete(): Promise<IncompleteProductDto[]> {
    const products = await this.productRepository.find({
      relations: {
        orders: true,
      },
    }); //получаем массив Product из БД
    console.log(products);
    const incompleteProducts: IncompleteProductDto[] = products.map(
      (product) => {
        //преобразуем массив Product в массив IncompleteProductDto
        const incompleteProduct = new IncompleteProductDto();
        incompleteProduct.id = product.id;
        incompleteProduct.name = product.name;
        incompleteProduct.price = product.price;
        return incompleteProduct;
      },
    );
    return incompleteProducts; //возвращаем массив IncompleteProductDto
  }

  async update(id: number, updatedProduct: Product) {
    //получаем объект Product для обновления по id
    const product = await this.productRepository.findOne({ where: { id } }); //получаем объект Product по id из БД
    product.name = updatedProduct.name; //обновляем поля объекта Product
    product.desc = updatedProduct.desc;
    product.price = updatedProduct.price;
    product.inStock = updatedProduct.inStock;
    product.orders = updatedProduct.orders;
    await this.productRepository.save(product); //сохраняем объект Product в БД
    return product; //возвращаем объект Product
  }

  remove(id: number) {
    this.productRepository.delete({ id }); //удаляем объект Product из БД
  }
}
