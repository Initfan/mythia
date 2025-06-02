import PopularNovelGenre from "@/components/home/popular-novel-genre";
import prisma from "@/lib/prisma";
import TopTimeNovel from "@/components/home/top-time-novel";
import React from "react";
import NewestNovel from "@/components/home/newest-novel";
import EventNovel from "@/components/home/event-novel";
import PopularNovel from "@/components/home/popular-novel";

const page = async () => {
	const novel = await prisma.novel.findMany({
		include: {
			chapter: true,
			author: { select: { pen_name: true } },
		},
	});
	const genre = await prisma.genre.findMany();

	return (
		<div className="space-y-4 pb-12">
			<EventNovel />
			<PopularNovel novel={novel} />
			<TopTimeNovel />
			<NewestNovel novel={novel} />
			<PopularNovelGenre genre={genre} />
		</div>
	);
};

export default page;
