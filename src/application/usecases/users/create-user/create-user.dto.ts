// src/app/use-cases/dto/criar-user.schema.ts
import { z } from 'zod';

export const CriarUserSchema = z.object({
  username: z.string().min(3).max(20),
});
