import { Rank } from '../../../src/domain';

export class UserRankDto {
  public id: string;
  public username: string;
  public points: {
    rank: Rank;
    previousRank: Rank;
    value: number;
    previousValue: number;
  };
  public games: {
    total: number;
    wins: number;
    loses: number;
  };
}
