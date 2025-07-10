import { Injectable } from '@nestjs/common';
import { Result } from '../../../../shared/result';
import { Rank, User } from 'src/domain';
import { UpdateUserSchema } from './update-user.dto';
import { RankRepository, UserRepository } from 'src/infra/repositories';
import { ZError } from 'src/utils';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rankRepository: RankRepository,
  ) {}

  async execute(input: unknown): Promise<Result<User>> {
    const resultData = UpdateUserSchema.safeParse(input);
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

    const userData: User = user.getValue()!;
    if (!userData || userData === null) {
      return Result.failure('User not found.');
    }

    if (resultData.data.game) {
      const nextRankPromise: Promise<Result<Rank>> =
        this.rankRepository.getNextRank(userData.points.rank);
      const previousRankPromise: Promise<Result<Rank>> =
        this.rankRepository.getPreviousRank(userData.points.rank);

      const [nextRank, previousRank] = await Promise.all([
        nextRankPromise,
        previousRankPromise,
      ]);

      userData.gameUpdate({
        game: resultData.data.game,
        rank: {
          previousRank: previousRank.isSuccess()
            ? previousRank.getValue()
            : null,
          nextRank: nextRank.isSuccess() ? nextRank.getValue() : null,
        },
      });
    }

    userData.update(resultData.data);

    const updateUser = await this.userRepository.updateUser(user.getValue()!);
    if (updateUser.isFailure()) {
      return Result.failure(updateUser.getError());
    }

    return Result.success(updateUser.getValue());
  }
}
