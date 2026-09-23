import { Request, Response } from 'express';
import { LivroService } from '../services/livro.service';

const livroService = new LivroService();

export class LivroController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const titulo = req.body.titulo || req.body.title;
      const autor = req.body.autor || req.body.author;
      const ano = req.body.ano || req.body.year;
      const categoria = req.body.categoria || req.body.category;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'O arquivo PDF é obrigatório.' });
      }

      if (!titulo || !autor || !ano || !categoria) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }

      const livro = await livroService.create({
        titulo,
        autor,
        ano: Number(ano),
        categoria,
        pdfUrl: file.path,
      });

      return res.status(201).json(livro);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const search = (req.query.search || req.query.busca) as string;
      const categoria = (req.query.category || req.query.categoria) as string;

      const livros = await livroService.getAll(search, categoria);
      return res.status(200).json(livros);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}