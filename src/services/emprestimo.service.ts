import { PrismaClient, StatusLivro, StatusEmprestimo } from '@prisma/client';

const prisma = new PrismaClient();

export class EmprestimoService {
  public async create(usuarioId: string, livroId: string) {
    const livro = await prisma.livro.findUnique({ where: { id: livroId } });

    if (!livro) {
      throw new Error('LIVRO_NAO_ENCONTRADO');
    }

    if (livro.status !== StatusLivro.DISPONIVEL) {
      throw new Error('LIVRO_INDISPONIVEL');
    }

    // Prazo de 14 dias
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 14);

    return await prisma.$transaction(async (tx) => {
      await tx.livro.update({
        where: { id: livroId },
        data: { status: StatusLivro.ALUGADO },
      });

      return await tx.emprestimo.create({
        data: {
          usuarioId,
          livroId,
          dataDevolucao,
          status: StatusEmprestimo.ALUGADO,
        },
      });
    });
  }

  public async getAll(filterStatus?: string) {
    const agora = new Date();
    const tresDiasPraFrente = new Date();
    tresDiasPraFrente.setDate(agora.getDate() + 3);

    if (filterStatus === 'AVAILABLE' || filterStatus === 'DISPONIVEL') {
      return await prisma.livro.findMany({ where: { status: StatusLivro.DISPONIVEL } });
    }

    if (filterStatus === 'RENTED' || filterStatus === 'ALUGADO') {
      return await prisma.emprestimo.findMany({
        where: { status: StatusEmprestimo.ALUGADO },
        include: { livro: true, usuario: true },
      });
    }

    if (filterStatus === 'DUE_SOON') {
      return await prisma.emprestimo.findMany({
        where: {
          status: StatusEmprestimo.ALUGADO,
          dataDevolucao: { gte: agora, lte: tresDiasPraFrente },
        },
        include: { livro: true, usuario: true },
      });
    }

    return await prisma.emprestimo.findMany({ include: { livro: true, usuario: true } });
  }

  public async returnBook(emprestimoId: string) {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: emprestimoId },
    });

    if (!emprestimo) {
      throw new Error('EMPRESTIMO_NAO_ENCONTRADO');
    }

    return await prisma.$transaction(async (tx) => {
      await tx.livro.update({
        where: { id: emprestimo.livroId },
        data: { status: StatusLivro.DISPONIVEL },
      });

      return await tx.emprestimo.update({
        where: { id: emprestimoId },
        data: {
          status: StatusEmprestimo.DEVOLVIDO,
          devolvidoEm: new Date(),
        },
      });
    });
  }
}