import { Request, Response } from 'express';
import { EmprestimoService } from '../services/emprestimo.service';

const emprestimoService = new EmprestimoService();

export class EmprestimoController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioId = (req as any).user?.id || req.body.usuarioId || req.body.userId;
      const livroId = req.body.livroId || req.body.bookId;

      if (!livroId) {
        return res.status(400).json({ error: 'O ID do livro é obrigatório.' });
      }

      const emprestimo = await emprestimoService.create(usuarioId, livroId);
      return res.status(201).json(emprestimo);
    } catch (error: any) {
      if (error.message === 'LIVRO_INDISPONIVEL') {
        return res.status(400).json({ error: 'Livro já se encontra alugado.' });
      }
      if (error.message === 'LIVRO_NAO_ENCONTRADO') {
        return res.status(404).json({ error: 'Livro não encontrado.' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const status = req.query.status as string;
      const result = await emprestimoService.getAll(status);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async returnBook(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await emprestimoService.returnBook(id);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'EMPRESTIMO_NAO_ENCONTRADO') {
        return res.status(404).json({ error: 'Empréstimo não encontrado.' });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}