import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true, //w disables response error messages
  }));




  await app.listen(3000);
}
bootstrap();
