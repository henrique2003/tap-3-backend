import { Result } from '../../../src/shared/result';
import { Rank } from './rank';

export class User {
  constructor(
    public id: string,
    public username: string,
    public points: {
      rank: Rank;
      value: number;
    },
    public games: {
      total: number;
      wins: number;
      loses: number;
    },
  ) {}

  static criar(username: string, rank: Rank): Result<User> {
    if (!username) {
      return Result.failure('Username must to be defined.');
    }

    if (!rank) {
      return Result.failure('RankId must to be defined.');
    }

    return Result.success(
      new User(
        '',
        username,
        {
          rank,
          value: 0,
        },
        {
          total: 0,
          wins: 0,
          loses: 0,
        },
      ),
    );
  }

  gameUpdate({
    rank,
    game,
  }: {
    rank: {
      previousRank: Rank | null;
      nextRank: Rank | null;
    };
    game: {
      win?: boolean;
      lose?: boolean;
    };
  }): Result<void> {
    if (!game) {
      return Result.failure('Game information must to be defined.');
    }

    if (!rank) {
      return Result.failure('Rank information must to be defined.');
    }

    if (game?.win && game?.lose) {
      return Result.failure('Game must be win or lose.');
    }

    const lastPointsValue: number = this.points.value;
    const currentRank: Rank = this.points.rank;

    if (game?.win) {
      this.games.wins++;
      this.games.total++;

      if (
        rank?.nextRank &&
        this.points.value + currentRank.receivePoints > currentRank.endValue
      ) {
        this.points.rank = rank.nextRank;
      }

      this.points.value += this.points.rank.receivePoints;
    } else if (game?.lose) {
      if (this.points.value - this.points.rank.deductionPoints < 0) {
        this.points.value = 0;
      } else {
        this.points.value -= this.points.rank.deductionPoints;
      }

      this.games.loses++;
      this.games.total++;

      if (
        rank?.previousRank &&
        lastPointsValue - currentRank.deductionPoints < currentRank.startValue
      ) {
        this.points.rank = rank.previousRank;
      }
    }

    return Result.success();
  }

  update({ username }: { username?: string }): Result<void> {
    if (username) {
      this.username = username;
    }

    return Result.success();
  }
}
