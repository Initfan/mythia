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

export const searchNovel = async (title: string, page?: string) => {
	const total = await prisma.novel.count({
		where: { title: { mode: "insensitive", contains: title } },
	});

	const novel = await prisma.novel.findMany({
		where: { title: { mode: "insensitive", contains: title } },
		include: {
			chapter: true,
		},
		skip: page ? (parseInt(page) - 1) * 10 : 0,
		take: 10,
	});

	return { novel, total };
};

export const getAllGenre = async () => {
	const genre = await prisma.genre.findMany();
	return genre;
};
