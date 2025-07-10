// src/app/use-cases/dto/criar-user.schema.ts
import { z } from 'zod';

export const GetUserByIdSchema = z.object({
  id: z.string(),
});
