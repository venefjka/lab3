import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Jinx - Crumb', description: 'Альбом - Исполнитель' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ example: '2019 - Portland', description: 'Год - Издатель' })
  @IsNotEmpty()
  @IsString()
  desc: string;
  @ApiProperty({ example: 1999, description: 'Стоимость' })
  @IsNotEmpty()
  price: number;
  @ApiProperty({ example: 1, description: 'Наличие (1/0)', required: false })
  inStock?: boolean;
}
