import { Request, Response } from 'express';
import { EmprestimoService } from '../services/emprestimo.service';
import { createEmprestimoSchema } from '../models/emprestimo.model';

const emprestimoService = new EmprestimoService();

export class EmprestimoController {
  async create(req: Request, res: Response) {
    try {
      const data = createEmprestimoSchema.parse(req.body);
      const emprestimo = await emprestimoService.create(data);
      res.status(201).json(emprestimo);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const { status } = req.query;
    const emprestimos = await emprestimoService.findByStatus(status as string);
    res.json(emprestimos);
  }
}