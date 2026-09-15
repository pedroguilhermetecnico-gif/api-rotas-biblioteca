import { Request, Response } from 'express';
import { LivroService } from '../services/livro.service';
import { createLivroSchema } from '../models/livro.model';

const livroService = new LivroService();

export class LivroController {
  async create(req: Request, res: Response) {
    try {
      const data = createLivroSchema.parse(req.body);
      const livro = await livroService.create(data);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const livros = await livroService.findAll();
    res.json(livros);
  }
}