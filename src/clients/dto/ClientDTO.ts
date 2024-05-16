import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  name: string;
  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  surname: string;
  @ApiProperty({ example: '89123456789', description: 'Телефон' })
  phoneNumber: string;
  @ApiProperty({ example: 'ivanov@mail.ru', description: 'Эл. почта' })
  email: string;
  @ApiProperty({
    example: 'г. Москва, ул. А, д. 1, кв. 1',
    description: 'г., ул., д., кв.',
  })
  address: string;
  //   @ApiProperty({ example: [1, 2], description: 'Список id заказов' })
  //   orders: number[];
}
