import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { registerUserSchema, loginUserSchema, updateUserSchema } from '../models/user.model';

const userService = new UserService();

export class UserController {
  // POST /users/register
  async register(req: Request, res: Response) {
    try {
      const data = registerUserSchema.parse(req.body);
      const userExists = await userService.findByEmail(data.email);
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }
      const user = await userService.register(data);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  // POST /users/login
  async login(req: Request, res: Response) {
    try {
      const data = loginUserSchema.parse(req.body);
      const user = await userService.findByEmail(data.email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      const validPassword = await bcrypt.compare(data.senha, user.senha);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1d' }
      );
      res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  // GET /users/me
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const user = await userService.findById(userId);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /users/:id
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = updateUserSchema.parse(req.body);
      const updatedUser = await userService.update(id, data);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.errors || error.message });
    }
  }

  // DELETE /users/:id
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userService.delete(id);
      res.status(200).json({ message: 'Usuário removido com sucesso' });
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao remover usuário ou ID inexistente' });
    }
  }
}