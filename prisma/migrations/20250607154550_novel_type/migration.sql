-- AlterTable
ALTER TABLE "novel" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'gratis',
ALTER COLUMN "status" SET DEFAULT 'berjalan';
