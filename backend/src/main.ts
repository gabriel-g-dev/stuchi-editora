import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableShutdownHooks();

    const port = process.env.PORT || 3000;

    await app.listen(port, '0.0.0.0');

    const url = await app.getUrl();
    logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`Listening on port: ${port}`);
    logger.log(`Application is running on: ${url}`);
  } catch (error) {
    logger.error('Fatal error during application bootstrap', error);
    process.exit(1);
  }
}
bootstrap();
