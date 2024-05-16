import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Jinx - Crumb', description: 'Альбом - Исполнитель' })
  name: string;
  @ApiProperty({ example: '2019 - Portland', description: 'Год - Издатель' })
  desc: string;
  @ApiProperty({ example: 1999, description: 'Стоимость' })
  price: number;
  @ApiProperty({ example: 1, description: 'Наличие (1/0)', required: false })
  inStock?: boolean;
}
