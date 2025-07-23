-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'reader',
    "image" TEXT,
    "coin" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

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
    "status" TEXT NOT NULL DEFAULT 'berjalan',
    "reviewd_by" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL DEFAULT 'gratis',
    "liked_by" INTEGER[],

    CONSTRAINT "novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_library" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT,

    CONSTRAINT "user_library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library_detail" (
    "id" SERIAL NOT NULL,
    "libraryId" INTEGER NOT NULL,
    "novelId" INTEGER NOT NULL,

    CONSTRAINT "library_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_history" (
    "id" SERIAL NOT NULL,
    "novelId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "novelChapterId" INTEGER NOT NULL,

    CONSTRAINT "novel_history_pkey" PRIMARY KEY ("id")
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
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAmount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChapterComment_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

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
ALTER TABLE "library_detail" ADD CONSTRAINT "library_detail_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "user_library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_detail" ADD CONSTRAINT "library_detail_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_history" ADD CONSTRAINT "novel_history_novelChapterId_fkey" FOREIGN KEY ("novelChapterId") REFERENCES "novel_chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_history" ADD CONSTRAINT "novel_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_history" ADD CONSTRAINT "novel_history_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_review" ADD CONSTRAINT "novel_review_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_review" ADD CONSTRAINT "novel_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_chapter" ADD CONSTRAINT "novel_chapter_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterComment" ADD CONSTRAINT "ChapterComment_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "novel_chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterComment" ADD CONSTRAINT "ChapterComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_novel" ADD CONSTRAINT "tag_novel_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

