import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { RankSchema, UserSchema } from './database';
import { RankRepository, TierListRepository } from './repositories';
import { RateLimitModule } from './rate-limit/rate-limit.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Rank', schema: RankSchema },
    ]),
    RateLimitModule,
  ],
  providers: [UserRepository, RankRepository, TierListRepository],
  exports: [UserRepository, RankRepository, TierListRepository],
})
export class InfraModule {}
