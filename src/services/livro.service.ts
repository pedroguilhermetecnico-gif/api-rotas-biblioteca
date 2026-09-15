import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class LivroService {
  async create(data: { titulo: string; dataPublicacao: string; nomeArquivo: string }) {
    return prisma.livro.create({
      data: {
        titulo: data.titulo,
        dataPublicacao: new Date(data.dataPublicacao),
        nomeArquivo: data.nomeArquivo
      }
    });
  }

  async findAll() {
    return prisma.livro.findMany();
  }
}