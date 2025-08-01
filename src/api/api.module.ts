import { Module } from '@nestjs/common';
import { TierListController, UserController } from './controllers';
import { UseCasesModule } from '../../src/application/usecases.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
  imports: [UseCasesModule],
  controllers: [TierListController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class ApiModule {}
