import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ disableErrorMessages: false, whitelist: true }),
  );
  await app.listen(PORT);
  console.log(`app listening on port ${PORT}`);
}
bootstrap();
