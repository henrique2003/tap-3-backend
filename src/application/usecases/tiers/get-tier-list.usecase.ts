import { Injectable } from '@nestjs/common';
import { TierListDto } from 'src/domain';
import { TierListRepository } from 'src/infra/repositories';
import { Result } from 'src/shared/result';

@Injectable()
export class GetTierListUseCase {
  constructor(private readonly tierListRepository: TierListRepository) {}

  async execute(): Promise<Result<TierListDto[]>> {
    const result = await this.tierListRepository.getAll();

    if (result.isFailure()) {
      return Result.failure(result.getError());
    }

    return Result.success(result.getValue());
  }
}
