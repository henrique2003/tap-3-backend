import { z } from 'zod';

export const GetListSchema = z.object({
  page: z.number().min(1).optional(),
});
