import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
      }

      const userExists = await userService.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);
      const user = await userService.register({
        nome,
        email,
        senha: hashedPassword,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const isValidPassword = await bcrypt.compare(senha, user.senha);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const secret = process.env.JWT_SECRET || 'secret';
      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: '1d',
      });

      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as any).user?.id;
      const user = await userService.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const data: any = {};
      if (nome) data.nome = nome;
      if (email) data.email = email;
      if (senha) data.senha = await bcrypt.hash(senha, 10);

      const updatedUser = await userService.update(id, data);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await userService.delete(id);
      return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}