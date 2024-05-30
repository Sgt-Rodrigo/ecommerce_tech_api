import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //w AUTH0 is not required in this proyect
  // app.use(auth(auth0Config));
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true, //w disables response error messages
  }));




  await app.listen(3000);
}
bootstrap();
