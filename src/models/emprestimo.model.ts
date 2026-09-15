import { z } from 'zod';

export const createEmprestimoSchema = z.object({
  usuarioId: z.number(),
  livroId: z.number(),
  dataDevolucao: z.string()
});
