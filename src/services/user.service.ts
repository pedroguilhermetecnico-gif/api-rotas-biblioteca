import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  public async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  public async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true },
    });
  }

  public async register(data: { nome: string; email: string; senha: string }) {
    return await prisma.user.create({
      data,
      select: { id: true, nome: true, email: true },
    });
  }

  public async getAll() {
    return await prisma.user.findMany({
      select: { id: true, nome: true, email: true },
    });
  }

  public async update(id: string, data: { nome?: string; email?: string; senha?: string }) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data,
      select: { id: true, nome: true, email: true },
    });
  }

  public async delete(id: string) {
    return await prisma.user.delete({
      where: { id: Number(id) }, // Linha 42 corrigida!
    });
  }
}