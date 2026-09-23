/*
  Warnings:

  - You are about to alter the column `status` on the `emprestimo` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `livro` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `emprestimo` MODIFY `status` ENUM('ALUGADO', 'DEVOLVIDO') NOT NULL DEFAULT 'ALUGADO';

-- AlterTable
ALTER TABLE `livro` MODIFY `status` ENUM('DISPONIVEL', 'ALUGADO') NOT NULL DEFAULT 'DISPONIVEL';
