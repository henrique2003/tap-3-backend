/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Schema, Document } from 'mongoose';

export interface RankDocument extends Document {
  id: string;
  name: string;
  startValue: number;
  endValue: number;
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
    collection: 'ranks',
  },
);
