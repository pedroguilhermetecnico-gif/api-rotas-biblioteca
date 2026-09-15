import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EmprestimoService {
  async create(data: { usuarioId: number; livroId: number; dataDevolucao: string }) {
    return prisma.$transaction([
      prisma.livro.update({ where: { id: data.livroId }, data: { disponivel: false } }),
      prisma.emprestimo.create({
        data: {
          usuarioId: data.usuarioId,
          livroId: data.livroId,
          dataDevolucao: new Date(data.dataDevolucao),
          status: 'ALUGADO'
        }
      })
    ]);
  }

  // Filtros exigidos pelo professor (Alugados, Disponíveis, Próximos do Prazo)
  async findByStatus(status?: string) {
    if (status === 'PROXIMO_DEVOLUCAO') {
      const hoje = new Date();
      const tresDias = new Date();
      tresDias.setDate(hoje.getDate() + 3);

      return prisma.emprestimo.findMany({
        where: {
          status: 'ALUGADO',
          dataDevolucao: { lte: tresDias, gte: hoje }
        },
        include: { livro: true, usuario: true }
      });
    }

    return prisma.emprestimo.findMany({
      where: status ? { status } : undefined,
      include: { livro: true, usuario: true }
    });
  }
}