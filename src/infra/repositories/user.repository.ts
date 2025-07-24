import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from '../../shared/result';
import { UserMapper, UserDocument } from '../database';
import { User } from 'src/domain';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByUsername(username: string): Promise<Result<User | null>> {
    try {
      const user = await this.userModel
        .findOne({ username })
        .populate('points.rank');
      if (!user) {
        return Result.success(null);
      }

      return Result.success(UserMapper.toDomain(user));
    } catch (error) {
      return Result.failure('Error to find user: ' + error);
    }
  }

  async getUserById(id: string): Promise<Result<User | null>> {
    try {
      const user = await this.userModel.findById(id).populate('points.rank');
      if (!user) {
        return Result.failure('User not found.');
      }

      return Result.success(UserMapper.toDomain(user));
    } catch (error) {
      return Result.failure('Error to find user: ' + error);
    }
  }

  async createUser(user: User): Promise<Result<User>> {
    try {
      const userDocument = await this.userModel.create(user);

      return Result.success(UserMapper.toDomain(userDocument));
    } catch (error) {
      return Result.failure('Error to create user: ' + error);
    }
  }

  async updateUser(user: User): Promise<Result<User>> {
    try {
      const updated = await this.userModel
        .findOneAndUpdate(
          { _id: user.id },
          {
            ...user,
            points: {
              ...user.points,
              rank: user.points.rank.id,
            },
          },
          {
            new: true,
          },
        )
        .populate('points.rank');

      if (!updated) {
        return Result.failure(`User not found.`);
      }

      return Result.success(UserMapper.toDomain(updated));
    } catch (error) {
      return Result.failure('Error to update user: ' + error);
    }
  }
}
