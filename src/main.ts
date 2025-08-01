import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

const port = Number(process.env.PORT) || 10000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port: ${port}`);
  });
}
void bootstrap();
