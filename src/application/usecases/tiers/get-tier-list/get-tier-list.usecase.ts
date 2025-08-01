import { Injectable } from '@nestjs/common';
import { TierListDto } from '@domain/index';
import { TierListRepository } from '@infra/repositories';
import { Result } from '@shared/result';
import { GetListSchema } from './get-tier-list.dto';
import { ZError } from '@utils/index';

@Injectable()
export class GetTierListUseCase {
  constructor(private readonly tierListRepository: TierListRepository) {}

  async execute(input: unknown): Promise<Result<TierListDto[]>> {
    const resultData = GetListSchema.safeParse(input);
    if (resultData.error) {
      if (ZError.create(resultData.error).errors.length > 0) {
        return Result.failure(ZError.create(resultData.error).errors[0]);
      }

      return Result.failure('Invalid data.');
    }

    const result = await this.tierListRepository.getAll(resultData.data.page);

    if (result.isFailure()) {
      return Result.failure(result.getError());
    }

    return Result.success(result.getValue());
  }
}
