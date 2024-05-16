import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { DatasourceModule } from './datasource/datasource.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false, // отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        // entities: ['src/**/*.entity{.ts,.js}'], // указываем путь к сущностям
        logging: 'all', // включим логирование для удобства отслеживания процессов
      }),
    }),
    CatalogModule,
    ClientsModule,
    OrdersModule,
    DatasourceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
