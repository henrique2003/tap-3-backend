import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { RankSchema, UserSchema } from './schemas';
import { RankRepository, TierListRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Rank', schema: RankSchema },
    ]),
  ],
  providers: [UserRepository, RankRepository, TierListRepository],
  exports: [UserRepository, RankRepository, TierListRepository],
})
export class InfraModule {}
