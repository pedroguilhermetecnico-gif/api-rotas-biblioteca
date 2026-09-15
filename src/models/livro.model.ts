import { z } from 'zod';

export const createLivroSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  dataPublicacao: z.string(),
  nomeArquivo: z.string().min(1, 'Nome do arquivo PDF é obrigatório')
});
