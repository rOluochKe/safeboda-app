import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(passport.initialize());

  const options = new DocumentBuilder()
    .setTitle('Safeboda API Documentation')
    .setDescription('This ride-sharing services api is similar to Uber.')
    .setVersion('1.0')
    .addTag('users', 'User operations')
    .addTag('rides', 'Ride operations')
    .addTag('drivers', 'Driver operations')
    .addTag('auth', 'Authentication')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
    },
  });

  await app.listen(3000);
}
bootstrap();
