import { ClientsService } from './clients.service';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { Client } from './client.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from './dto/ClientDTO';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Получение перечня всех клиентов' })
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о клиенте' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление информации о клиенте' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClient: Client) {
    return this.clientsService.update(+id, updateClient);
  }

  @ApiOperation({ summary: 'Добавление нового клиента' })
  @Post()
  create(@Body() createClient: CreateClientDto) {
    return this.clientsService.create(createClient);
  }

  @ApiOperation({ summary: 'Удаление клиента' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
