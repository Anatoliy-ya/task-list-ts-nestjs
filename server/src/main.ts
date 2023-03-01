import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  console.log('start');

  try {
    const PORT = process.env.PORT || 3300;
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(PORT, () => console.log(`ok ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
