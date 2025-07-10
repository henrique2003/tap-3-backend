import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../../shared/result';
import { UserMapper, UserDocument } from '../database';
import { TierListDto } from 'src/domain/dtos';

@Injectable()
export class TierListRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<Result<TierListDto[]>> {
    try {
      const users = await this.userModel.find({}, null, {
        sort: { 'rank.value': -1 },
      });

      const domainUsers = UserMapper.toDomainList(users);

      const tierList = domainUsers.map(
        (user) =>
          ({
            id: user.id,
            username: user.username,
            rank: user.points.value,
          }) satisfies TierListDto,
      );

      return Result.success(tierList);
    } catch (error) {
      return Result.failure('Error to find tier list: ' + error);
    }
  }
}
