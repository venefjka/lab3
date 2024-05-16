import { CatalogService } from './catalog.service';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/ProductDTO';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({ summary: 'Получение перечня всех продуктов в каталоге' })
  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о продукте' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Получение информации о продукте неидентиф. пользователем',
  })
  @Get('/incomplete')
  findIncomplete() {
    return this.catalogService.findIncomplete();
  }

  @ApiOperation({ summary: 'Обновление информации о продукте' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProduct: Product) {
    return this.catalogService.update(+id, updateProduct);
  }
  @ApiOperation({ summary: 'Добавление нового продукта' })
  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.catalogService.create(createProduct);
  }
  @ApiOperation({ summary: 'Удаление продукта' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }
}
