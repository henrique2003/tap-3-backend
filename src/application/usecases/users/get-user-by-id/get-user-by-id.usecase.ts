import { Injectable } from '@nestjs/common';
import { Result } from '../../../../shared/result';
import { User } from 'src/domain';
import { GetUserByIdSchema } from './get-user-by-id.dto';
import { UserRepository } from 'src/infra/repositories';
import { ZError } from 'src/utils';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: unknown): Promise<Result<User>> {
    const resultData = GetUserByIdSchema.safeParse(input);
    if (resultData.error) {
      if (ZError.create(resultData.error).errors.length > 0) {
        return Result.failure(ZError.create(resultData.error).errors[0]);
      }

      return Result.failure('Invalid data.');
    }

    const user = await this.userRepository.getUserById(resultData.data.id);
    if (user.isFailure()) {
      return Result.failure(user.getError());
    }
    if (
      (!user.getValue() && !user.getValue()?.id) ||
      user.getValue() === null
    ) {
      return Result.failure('User not found.');
    }

    return Result.success(user.getValue()!);
  }
}
