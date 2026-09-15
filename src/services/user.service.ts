import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async create(data: any) {
    // Simulando a criação de um usuário
    return { id: 2, ...data, message: "Usuário criado com sucesso (Simulado)" };
  }

  async findAll() {
    // Retornando a lista que você já tinha feito
    return [
      { id: 1, nome: "Usuário Teste", email: "teste@email.com" }
    ];
  }

  async findById(id: number) {
    // Simulando a busca por ID
    return { id, nome: "Usuário Encontrado", email: "buscado@email.com" };
  }

  // 👇 NOVA FUNÇÃO ADICIONADA AQUI 👇
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async update(id: number, data: any) {
    // Simulando uma atualização
    return { id, ...data, message: "Usuário atualizado com sucesso (Simulado)" };
  }

  async delete(id: number) {
    // Simulando a exclusão
    return { message: `Usuário com ID ${id} foi deletado (Simulado)` };
  }
}