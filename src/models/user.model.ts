import { z } from 'zod';

export const createUserSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  role: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();