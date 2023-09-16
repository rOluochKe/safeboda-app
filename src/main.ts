import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Safeboda API Documentation')
    .setDescription('This ride-sharing services api is similar to Uber.')
    .setVersion('1.0')
    .addTag('users', 'User operations')
    .addTag('rides', 'Ride operations')
    .addTag('drivers', 'Driver operations')
    .addTag('auth', 'Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(3000);
}
bootstrap();
