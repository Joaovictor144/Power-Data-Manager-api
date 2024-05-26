/*
  Warnings:

  - A unique constraint covering the columns `[numeroCliente,numeroInstalacao]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroInstalacao` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_instalacao` to the `fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_fatura` to the `fatura` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fatura" DROP CONSTRAINT "fatura_numero_cliente_fkey";

-- DropIndex
DROP INDEX "cliente_numeroCliente_key";

-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "numeroInstalacao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fatura" ADD COLUMN     "numero_instalacao" TEXT NOT NULL,
ADD COLUMN     "valor_fatura" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cliente_numeroCliente_numeroInstalacao_key" ON "cliente"("numeroCliente", "numeroInstalacao");

-- CreateIndex
CREATE INDEX "fatura_numero_instalacao_idx" ON "fatura"("numero_instalacao");

-- AddForeignKey
ALTER TABLE "fatura" ADD CONSTRAINT "fatura_numero_cliente_numero_instalacao_fkey" FOREIGN KEY ("numero_cliente", "numero_instalacao") REFERENCES "cliente"("numeroCliente", "numeroInstalacao") ON DELETE RESTRICT ON UPDATE CASCADE;
