import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Market API')
    .setVersion('1.0')
    .build(); // Конфигурируем сборщик документации
  const document = SwaggerModule.createDocument(app, config); // создаем апи документацию
  SwaggerModule.setup('api_docs', app, document); //включаем документацию Swagger по пути localhost:3002/api_docs
  await app.listen(3002); //устанавливаем порт прослушивания 3002
  await app.setGlobalPrefix('/api'); //глобальный префикс для роутов контроллера
}
bootstrap();
