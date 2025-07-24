import { Injectable } from '@nestjs/common';
import { TierListDto } from 'src/domain';
import { TierListRepository } from 'src/infra/repositories';
import { Result } from 'src/shared/result';
import { GetListSchema } from './get-tier-list.dto';
import { ZError } from 'src/utils';

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
