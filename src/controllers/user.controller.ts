import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createUserSchema, updateUserSchema } from '../models/user.model';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await userService.create(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findById(Number(id));
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateUserSchema.parse(req.body);
      const userExists = await userService.findById(Number(id));
      if (!userExists) return res.status(404).json({ error: 'Usuário não encontrado' });
      const updatedUser = await userService.update(Number(id), data);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userExists = await userService.findById(Number(id));
      if (!userExists) return res.status(404).json({ error: 'Usuário não encontrado' });
      await userService.delete(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}