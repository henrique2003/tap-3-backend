import { Injectable } from '@nestjs/common';
import { Result } from '../../../../shared/result';
import { User } from '../../../../../src/domain';
import { CriarUserSchema } from './create-user.dto';
import {
  RankRepository,
  UserRepository,
} from '../../../../../src/infra/repositories';
import { ZError } from '../../../../../src/utils';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rankRepository: RankRepository,
  ) {}

  async execute(input: unknown): Promise<Result<User>> {
    const resultData = CriarUserSchema.safeParse(input);
    if (resultData.error) {
      if (ZError.create(resultData.error).errors.length > 0) {
        return Result.failure(ZError.create(resultData.error).errors[0]);
      }

      return Result.failure('Invalid data.');
    }

    const result = await this.userRepository.getUserByUsername(
      resultData.data.username,
    );
    if (result.isFailure()) {
      return Result.failure(result.getError());
    }
    if (result.getValue()?.id) {
      return Result.failure('Username already in use.');
    }

    const rank = await this.rankRepository.getStarterRank();
    if (rank.isFailure()) {
      return Result.failure(rank.getError());
    }

    const user = User.criar(resultData.data.username, rank.getValue());
    if (user.isFailure()) {
      return user;
    }

    const newUser = await this.userRepository.createUser(user.getValue());
    if (newUser.isFailure()) {
      return Result.failure(newUser.getError());
    }

    return Result.success(newUser.getValue());
  }
}
