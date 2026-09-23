/*
  Warnings:

  - The primary key for the `emprestimo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `status` on the `emprestimo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - The primary key for the `livro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataPublicacao` on the `livro` table. All the data in the column will be lost.
  - You are about to drop the column `disponivel` on the `livro` table. All the data in the column will be lost.
  - You are about to drop the column `nomeArquivo` on the `livro` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Made the column `dataDevolucao` on table `emprestimo` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ano` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfUrl` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Livro` table without a default value. This is not possible if the table is not empty.
  - Made the column `autor` on table `livro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoria` on table `livro` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `emprestimo` DROP FOREIGN KEY `Emprestimo_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `emprestimo` DROP FOREIGN KEY `Emprestimo_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `emprestimo` DROP PRIMARY KEY,
    ADD COLUMN `devolvidoEm` DATETIME(3) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `usuarioId` VARCHAR(191) NOT NULL,
    MODIFY `livroId` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('RENTED', 'RETURNED') NOT NULL DEFAULT 'RENTED',
    MODIFY `dataDevolucao` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `livro` DROP PRIMARY KEY,
    DROP COLUMN `dataPublicacao`,
    DROP COLUMN `disponivel`,
    DROP COLUMN `nomeArquivo`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `pdfUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('AVAILABLE', 'RENTED') NOT NULL DEFAULT 'AVAILABLE',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `autor` VARCHAR(191) NOT NULL,
    MODIFY `categoria` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `role`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
