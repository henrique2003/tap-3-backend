/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Schema, Document } from 'mongoose';
import { RankDocument } from './rank.schema';

export interface UserDocument extends Document {
  id: string;
  username: string;
  points: {
    rank: RankDocument;
    value: number;
  };
  games: {
    total: number;
    wins: number;
    loses: number;
  };
}

export const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    points: {
      rank: {
        type: Schema.Types.ObjectId,
        ref: 'Rank',
        required: true,
      },
      value: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    games: {
      total: {
        type: Number,
        default: 0,
        required: true,
      },
      wins: {
        type: Number,
        default: 0,
        required: true,
      },
      loses: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        ret.id = (ret as any)._id?.toString() as string;

        delete (ret as any)._id;
      },
    },
    collection: 'users',
  },
);
