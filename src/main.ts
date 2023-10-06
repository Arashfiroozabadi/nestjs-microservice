import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const NODE_ENV = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  await app.startAllMicroservices();

  // setup swagger
  if (NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Swagger API DOC')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(3001, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
  if (NODE_ENV === 'development') {
    console.log(`swagger doc is running on: ${await app.getUrl()}/doc`);
  }
}

bootstrap();
