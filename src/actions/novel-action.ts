"use server";

import prisma from "@/lib/prisma";

export const novelByGenre = async (genre: string) => {
	const novel = await prisma.novel.findMany({
		where: { genre: { equals: genre } },
		include: { chapter: true },
		take: 10,
	});

	return novel;
};
