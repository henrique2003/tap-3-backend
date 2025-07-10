import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { UseCasesModule } from './application/usecases.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    InfraModule,
    UseCasesModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
