import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Иван', description: 'Имя' })
  name: string;
  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  surname: string;
  @ApiProperty({ example: '89123456789', description: 'Телефон' })
  phoneNumber: string;
  @ApiProperty({ example: 'ivanov@mail.ru', description: 'Эл. почта' })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'г. Москва, ул. А, д. 1, кв. 1',
    description: 'г., ул., д., кв.',
  })
  address: string;
}
