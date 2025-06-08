"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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

export const searchNovel = async (
	title: string,
	page?: string,
	filter?: string,
	value?: string
) => {
	const filtering = {
		[filter!]: { equals: value },
	};

	let total = 0;
	let novel: Prisma.novelGetPayload<{
		include: {
			chapter: true;
		};
	}>[] = [];
	if (filter && filter != "created") {
		total = await prisma.novel.count({
			where: {
				title: { mode: "insensitive", contains: title },
				...filtering,
			},
		});

		novel = await prisma.novel.findMany({
			where: {
				title: { mode: "insensitive", contains: title },
				...filtering,
			},
			include: {
				chapter: true,
			},
			skip: page ? (parseInt(page) - 1) * 10 : 0,
			take: 10,
		});
	} else if (filter == "created") {
		total = await prisma.novel.count({
			where: {
				title: { mode: "insensitive", contains: title },
			},
			orderBy: { createdAt: value == "terbaru" ? "asc" : "desc" },
		});

		novel = await prisma.novel.findMany({
			where: {
				title: { mode: "insensitive", contains: title },
			},
			include: {
				chapter: true,
			},
			orderBy: { createdAt: value == "terbaru" ? "asc" : "desc" },
			skip: page ? (parseInt(page) - 1) * 10 : 0,
			take: 10,
		});
	} else {
		total = await prisma.novel.count({
			where: {
				title: { mode: "insensitive", contains: title },
			},
		});

		novel = await prisma.novel.findMany({
			where: {
				title: { mode: "insensitive", contains: title },
			},
			include: {
				chapter: true,
			},
			skip: page ? (parseInt(page) - 1) * 10 : 0,
			take: 10,
		});
	}
	return { total, novel };
};

export const getAllGenre = async () => {
	const genre = await prisma.genre.findMany();
	return genre;
};
