import { User } from 'src/domain';
import { UserDocument } from '../schemas/user.schema';

export class UserMapper {
  static toDomain(user: UserDocument): User {
    return new User(
      user.id,
      user.username,
      {
        rank: user.points.rank,
        value: user.points.value,
      },
      {
        total: user.games.total,
        wins: user.games.wins,
        loses: user.games.loses,
      },
    );
  }

  static toDomainList(user: UserDocument[]): User[] {
    return user.map((u) => this.toDomain(u));
  }
}
