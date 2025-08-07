import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../../shared/result';
import { UserDocument } from '../database';
import { TierListDto } from '../../../src/domain/dtos';

@Injectable()
export class TierListRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(page: number = 1): Promise<Result<TierListDto[]>> {
    try {
      const limit = 20;
      const skip = (page - 1) * limit;

      const users = await this.userModel
        .find({}, null, {
          sort: { 'points.value': -1 },
          limit,
          skip,
        })
        .populate('points.rank')
        .lean();

      const tierList = users.map(
        (user) =>
          ({
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            id: user._id?.toString() ?? '',
            username: user.username,
            rank: {
              value: user.points.value,
              color: user.points.rank.color,
            },
          }) satisfies TierListDto,
      );

      return Result.success(await Promise.all(tierList));
    } catch (error) {
      return Result.failure('Error to find tier list: ' + error);
    }
  }
}
