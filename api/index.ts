import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import helmet from 'helmet';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: any;

async function bootstrap() {
  const expressApp = express();

  expressApp.use(helmet()); // <- aplica o helmet na execução na Vercel

  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return serverlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
  try {
    if (!cachedServer) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      cachedServer = await bootstrap();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return cachedServer(req, res);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const errorLog = error?.message ?? error;
    console.error(errorLog);
  }
}
