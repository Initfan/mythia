"use server";

import { novel, novel_chapter } from "@/generated";
import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
	title: z.string().min(4),
	genre: z.string(),
	synopsis: z.string(),
	target_audience: z.string(),
	content_rating: z.string(),
	tag_novel: z.string().array(),
});

const chapterSchema = z.object({
	title: z.string(),
	content: z.string(),
	novelId: z.number(),
});

type response = {
	message: string;
	data?: novel | novel_chapter;
	status?: number;
	error?: string;
};

export const updateCover = async (
	novelId: number,
	cover: string
): Promise<novel> => {
	return await prisma.novel.update({
		where: { id: novelId },
		data: { cover },
	});
};

export async function createChapter(
	value: z.infer<typeof chapterSchema>
): Promise<response> {
	try {
		const parsed = chapterSchema.safeParse(value);

		if (parsed.error)
			return {
				message: "Gagal menambah chapter novel",
				error: JSON.stringify(parsed.error),
			};

		const totalChapter = await prisma.novel_chapter.count({
			where: { novelId: parsed.data.novelId },
		});

		const novel = await prisma.novel_chapter.create({
			data: { ...parsed.data, chapter: (totalChapter ?? 0) + 1 },
		});

		return {
			message: "Chapter novel berhasil dibuat",
			data: novel,
			status: 201,
		};
	} catch (error) {
		return {
			message: "Server error, try again later",
			error: JSON.stringify(error),
		};
	}
}

export const getChapterList = async (novelId: number) => {
	const chapters = await prisma.novel_chapter.findMany({
		where: { novelId },
		include: { novel: { select: { title: true } } },
	});
	return chapters;
};

export async function updateNovel(
	data: z.infer<typeof schema> & { novelId: number }
) {
	const parsed = schema.omit({ tag_novel: true }).safeParse(data);
	const parsedTag = schema.pick({ tag_novel: true }).safeParse(data);

	const novel = await prisma.novel.update({
		where: { id: data.novelId },
		data: parsed.data!,
	});

	if (parsedTag.success) {
		await prisma.tag_novel.deleteMany({
			where: { novelId: novel.id },
		});
		await Promise.all(
			parsedTag.data.tag_novel.map((v: string) =>
				prisma.tag_novel.create({
					data: { novelId: novel.id, tag: v },
				})
			)
		);
	}

	return {
		message: "Novel berhasil diupdate",
		status: 201,
	};
}

export async function createNovel(
	data: z.infer<typeof schema>
): Promise<response | null> {
	const { user } = await verifySession();

	try {
		const parsedTag = schema.pick({ tag_novel: true }).safeParse(data);
		const parsedNovel = schema.omit({ tag_novel: true }).safeParse(data);

		if (!parsedNovel.success)
			return {
				message: "Gagal membuat novel",
				error: JSON.stringify(parsedNovel.error.flatten().fieldErrors),
			};

		const novel = await prisma.novel.create({
			data: {
				...parsedNovel.data,
				cover: "",
				authorId: user!.author!.id,
			},
		});

		if (parsedTag.success)
			await Promise.all(
				parsedTag.data.tag_novel.map((v: string) =>
					prisma.tag_novel.create({
						data: { novelId: novel.id, tag: v },
					})
				)
			);

		return {
			message: "Novel berhasil dibuat",
			data: novel,
			status: 201,
		};
	} catch (error) {
		console.log(error);
		return {
			message: "Server error, try again later",
			error: JSON.stringify(error),
			status: 500,
		};
	}
}

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

export const getAuthorNovel = async () => {
	const { user } = await verifySession();

	if (!user?.author) return redirect("/");

	const novels = await prisma.novel.findMany({
		where: { authorId: user.author.id },
		include: { chapter: true },
	});

	return novels;
};

export const getNovelId = async (novelId: number) => {
	const novels = await prisma.novel.findUnique({
		where: { id: novelId },
		include: { chapter: true, _count: true },
	});

	return novels;
};

export const getNovelsId = async (novelsId: number[]) => {
	const novels = await prisma.novel.findMany({
		where: { id: { in: novelsId } },
		include: { chapter: true },
	});

	return novels;
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
