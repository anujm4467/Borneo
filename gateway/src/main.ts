import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('NestJS API Gateway')
    .setDescription(
      'Find here the list of endpoints to communicate with the microservices/APIs',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}

bootstrap();
