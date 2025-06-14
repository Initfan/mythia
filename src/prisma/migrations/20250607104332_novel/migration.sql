/*
  Warnings:

  - You are about to drop the column `genre_type` on the `genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "genre" DROP COLUMN "genre_type";

-- DropEnum
DROP TYPE "GenderType";
