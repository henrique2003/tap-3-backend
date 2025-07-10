import { Result } from 'src/shared/result';
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

  update({
    username,
    points,
    game,
  }: {
    username?: string;
    points?: {
      rank?: Rank;
      value?: number;
    };
    game?: {
      win?: boolean;
      lose?: boolean;
    };
  }): Result<void> {
    if (game?.win && game?.lose) {
      return Result.failure('Game must be win or lose.');
    }

    if (username) {
      this.username = username;
    }

    if (points?.rank) {
      this.points.rank = points.rank;
    }
    if (points?.value) {
      this.points.value = points.value;
    }

    if (game?.win) {
      this.games.wins++;
      this.games.total++;
    }
    if (game?.lose) {
      this.games.loses++;
      this.games.total++;
    }

    return Result.success();
  }
}
