import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Permet de transformer automatiquement les données entrantes en objets correspondants aux DTO
    transformOptions: { enableImplicitConversion: true }, // Activation de la conversion implicite pour les types non stricts
  }));

  app.enableCors({
    origin: ['http://localhost:3000'], // Allowed origin
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  
  await app.listen(4000);
}
bootstrap();
