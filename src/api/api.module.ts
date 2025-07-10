import { Module } from '@nestjs/common';
import { TierListController, UserController } from './controllers';
import { UseCasesModule } from 'src/application/usecases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [TierListController, UserController],
  providers: [],
})
export class ApiModule {}
