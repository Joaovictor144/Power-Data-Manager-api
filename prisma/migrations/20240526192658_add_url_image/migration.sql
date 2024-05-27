/*
  Warnings:

  - Added the required column `url_image` to the `fatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fatura" ADD COLUMN     "url_image" TEXT NOT NULL;
