-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'reader';

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "image" TEXT,
    "pen_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "content_rating" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,
    "target_audience" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'On going',
    "reviewd_by" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_library" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "user_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "novelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "liked_by" INTEGER[],

    CONSTRAINT "novel_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_chapter" (
    "id" SERIAL NOT NULL,
    "chapter" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "novelId" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter_comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "chapter_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_novel" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "tag_novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "genre" TEXT NOT NULL,
    "genre_type" "GenderType" NOT NULL DEFAULT 'male',

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_userId_key" ON "author"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "author_pen_name_key" ON "author"("pen_name");

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel" ADD CONSTRAINT "novel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_library" ADD CONSTRAINT "user_library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_library" ADD CONSTRAINT "user_library_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_review" ADD CONSTRAINT "novel_review_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_review" ADD CONSTRAINT "novel_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_chapter" ADD CONSTRAINT "novel_chapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_comment" ADD CONSTRAINT "chapter_comment_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "novel_chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_comment" ADD CONSTRAINT "chapter_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_novel" ADD CONSTRAINT "tag_novel_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
