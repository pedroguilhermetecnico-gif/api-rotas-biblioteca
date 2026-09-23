import { PrismaClient, StatusLivro } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateLivroDTO {
  titulo: string;
  autor: string;
  ano: number;
  categoria: string;
  pdfUrl: string;
}

export class LivroService {
  public async create(data: CreateLivroDTO) {
    return await prisma.livro.create({
      data: {
        titulo: data.titulo,
        autor: data.autor,
        ano: Number(data.ano),
        categoria: data.categoria,
        pdfUrl: data.pdfUrl,
        status: StatusLivro.DISPONIVEL,
      },
    });
  }

  public async getAll(search?: string, categoria?: string) {
    const where: any = {};

    if (categoria) {
      where.categoria = { equals: categoria };
    }

    if (search) {
      where.OR = [
        { titulo: { contains: search } },
        { autor: { contains: search } },
      ];
    }

    return await prisma.livro.findMany({ where });
  }
}