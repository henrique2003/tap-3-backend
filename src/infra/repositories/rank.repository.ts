import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../../shared/result';
import { Rank } from '../../../src/domain';
import { RankDocument } from '../database';

@Injectable()
export class RankRepository {
  constructor(
    @InjectModel('Rank') private readonly rankModel: Model<RankDocument>,
  ) {}

  async getAll(): Promise<Result<Rank[]>> {
    try {
      const ranks = await this.rankModel.find({}, null, {
        sort: { 'rank.createdAt': 1 },
      });

      return Result.success(ranks);
    } catch (error) {
      return Result.failure('Error to find ranks: ' + error);
    }
  }

  async getStarterRank(): Promise<Result<Rank>> {
    try {
      const ranks = await this.rankModel.findOne({ startValue: 0 });
      if (!ranks) {
        return Result.failure('Rank not found.');
      }

      return Result.success(ranks);
    } catch (error) {
      return Result.failure('Error to find rank: ' + error);
    }
  }

  async getNextRank(rank: Rank): Promise<Result<Rank>> {
    try {
      const ranks = await this.rankModel.findOne({ startValue: rank.endValue });
      if (!ranks) {
        return Result.failure('Rank not found.');
      }

      return Result.success(ranks);
    } catch (error) {
      return Result.failure('Error to find rank: ' + error);
    }
  }

  async getPreviousRank(rank: Rank): Promise<Result<Rank>> {
    try {
      const ranks = await this.rankModel.findOne({
        endValue: rank.startValue,
      });
      if (!ranks) {
        return Result.failure('Rank not found.');
      }

      return Result.success(ranks);
    } catch (error) {
      return Result.failure('Error to find rank: ' + error);
    }
  }
}
