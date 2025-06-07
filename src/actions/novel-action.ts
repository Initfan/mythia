"use server";

import prisma from "@/lib/prisma";

export const novelByGenre = async (genre: string) => {
	const novel = await prisma.novel.findMany({
		where: { genre: { equals: genre } },
		include: {
			chapter: true,
			author: { select: { pen_name: true } },
		},
		take: 10,
	});

	return novel;
};

export const searchNovel = async (title: string) => {
	const novel = await prisma.novel.findMany({
		where: { title: { mode: "insensitive", contains: title } },
		include: {
			chapter: true,
		},
	});
	return novel;
};
