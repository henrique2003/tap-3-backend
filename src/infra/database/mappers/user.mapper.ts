import { User } from '../../../../src/domain';
import { UserDocument } from '../schemas/user.schema';

export class UserMapper {
  static toDomain(user: UserDocument): User {
    // console.log(user);
    // console.log(user.points);

    return new User(
      user.id,
      user.username,
      {
        rank: {
          id: user.points.rank.id,
          name: user.points.rank.name,
          startValue: user.points.rank.startValue,
          endValue: user.points.rank.endValue,
          receivePoints: user.points.rank.receivePoints,
          deductionPoints: user.points.rank.deductionPoints,
          color: user.points.rank.color,
        },
        value: user.points.value,
      },
      {
        total: user.games.total,
        wins: user.games.wins,
        loses: user.games.loses,
      },
    );
  }

  static toDomainList(users: UserDocument[]): User[] {
    return users.map((u) => this.toDomain(u));
  }
}
