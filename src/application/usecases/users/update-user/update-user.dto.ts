import { z } from 'zod';

export const UpdateUserSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(20).optional(),
  game: z
    .object({
      win: z.boolean().optional(),
      lose: z.boolean().optional(),
    })
    .optional(),
});
