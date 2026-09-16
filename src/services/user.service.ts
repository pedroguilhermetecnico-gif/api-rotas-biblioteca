import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class UserService {
  async register(data: { nome: string; email: string; senha: string }) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedPassword
      },
      select: { id: true, nome: true, email: true, role: true }
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, role: true }
    });
  }

  async update(id: number, data: { nome?: string; email?: string; senha?: string }) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, nome: true, email: true, role: true }
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id }
    });
  }
}