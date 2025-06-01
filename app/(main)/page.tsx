import HighlightNovel from "@/components/home/highlight-novel";
import PopularNovel from "@/components/home/popular-novel";
import PopularNovelGenre from "@/components/home/popular-novel-genre";
import prisma from "@/lib/prisma";
import TopTimeNovel from "@/components/home/top-time-novel";
import React from "react";

const page = async () => {
	const novel = await prisma.novel.findMany({ include: { chapter: true } });
	const genre = await prisma.genre.findMany();

	return (
		<main className="space-y-4 pb-12">
			<HighlightNovel />
			<PopularNovel novel={novel} />
			<TopTimeNovel />
			<PopularNovelGenre genre={genre} />
			{/* Novel dari author terkenal / favorit */}
			{/* Novel baru */}
			{/* Author terpopuler */}
			{/* Karena kamu suka romane */}
			{/* footer */}
		</main>
	);
};

export default page;
