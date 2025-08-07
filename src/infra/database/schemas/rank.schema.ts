import { BotOpponent } from '@domain/enums/bot-opponent';
import { Schema, Document } from 'mongoose';

export interface RankDocument extends Document {
  id: string;
  name: string;
  startValue: number;
  endValue: number;
  color: string;
  receivePoints: number;
  deductionPoints: number;
  botOpponent: BotOpponent;
}

export const RankSchema = new Schema<RankDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    startValue: {
      type: Number,
      required: true,
    },
    endValue: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    receivePoints: {
      type: Number,
      required: true,
    },
    deductionPoints: {
      type: Number,
      required: true,
    },
    botOpponent: {
      type: Number,
      enum: [BotOpponent.Easy, BotOpponent.Normal, BotOpponent.Hard],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = (ret as any)._id?.toString() as string;

        delete (ret as any)._id;
      },
    },
    collection: 'ranks',
  },
);
