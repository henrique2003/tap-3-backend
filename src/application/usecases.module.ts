import { Module } from '@nestjs/common';
import { GetTierListUseCase } from './usecases/tiers';
import { InfraModule } from '../../src/infra/infra.module';
import { UpdateUserUseCase, CreateUserUseCase } from './usecases/users';
import { GetUserByIdUseCase } from './usecases/users/get-user-by-id/get-user-by-id.usecase';

@Module({
  imports: [InfraModule],
  providers: [
    CreateUserUseCase,
    GetTierListUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetTierListUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
  ],
})
export class UseCasesModule {}
