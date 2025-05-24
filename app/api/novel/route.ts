import prisma from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
	try {
		const novel = await prisma.novel.findMany();
		return Response.json({ message: "Novel data", data: novel });
	} catch (error) {
		return Response.json(
			{
				message: "Server error, try again later",
				error,
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const validation = z.object({
			title: z.string().min(4),
			genre: z.string(),
			synopsis: z.string(),
			target_audience: z.string(),
			content_rating: z.string(),
			cover: z.string(),
			authorId: z.number(),
			tag_novel: z.string().array().nullable(),
		});

		const validate = validation.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal membuat novel",
				error: validate.error,
			});

		const novel = await prisma.novel.create({
			data: {
				title: validate.data.title,
				genre: validate.data.genre,
				synopsis: validate.data.synopsis,
				target_audience: validate.data.target_audience,
				content_rating: validate.data.content_rating,
				cover: validate.data.cover,
				authorId: validate.data.authorId,
			},
		});

		if (validate.data.tag_novel)
			await Promise.all(
				validate.data.tag_novel.map((v) =>
					prisma.tag_novel.create({
						data: { novelId: novel.id, tag: v },
					})
				)
			);

		return Response.json(
			{
				message: "Novel berhasil dibuat",
				data: novel,
			},
			{ status: 201 }
		);
	} catch (error) {
		return Response.json(
			{
				message: "Server error, try again later",
				error,
			},
			{ status: 500 }
		);
	}
}
