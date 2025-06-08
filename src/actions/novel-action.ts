"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const novelByGenre = async (genre: string) => {
	const total = await prisma.novel.count({ where: { genre } });

	const novel = await prisma.novel.findMany({
		where: { genre: { equals: genre } },
		include: {
			chapter: true,
			author: { select: { pen_name: true } },
		},
		skip: Math.floor(Math.random() * total),
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

export const likedNovel = async (id: number, userId: number) => {
	try {
		const liked = await prisma.novel.findFirst({
			where: { id, liked_by: { has: userId } },
			select: { title: true },
		});

		return {
			message: "Telah memberi like novel",
			novel: liked?.title,
			liked: true,
		};
	} catch (error) {
		return {
			message: "Belum memberi like novel",
			error,
		};
	}
};

export const likeNovel = async (id: number, userId: number) => {
	try {
		const liked = await prisma.novel.update({
			where: { id },
			data: { liked_by: { push: userId } },
			select: { title: true },
		});

		return {
			message: "Berhasil memberi like novel",
			novel: liked.title,
			liked: true,
		};
	} catch (error) {
		return {
			message: "Gagal memberi like novel",
			error,
		};
	}
};

export const unlikeNovel = async (id: number, userId: number) => {
	try {
		const removeLike = await prisma.novel.findUnique({
			where: { id },
			select: { liked_by: true },
		});

		const updatedLike = removeLike?.liked_by.filter((v) => v != userId);

		const liked = await prisma.novel.update({
			where: { id },
			data: { liked_by: { set: updatedLike } },
			select: { title: true },
		});

		return {
			message: "Berhasil memberi like novel",
			novel: liked.title,
			liked: false,
		};
	} catch (error) {
		return {
			message: "Gagal memberi like novel",
			error,
		};
	}
};
