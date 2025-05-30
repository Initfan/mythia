import prisma from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const validate = z
			.object({
				comment: z.string(),
				userId: z.number(),
				chapterId: z.number(),
			})
			.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal komen chapter novel",
				error: validate.error,
			});

		const comment = await prisma.chapter_comment.create({
			data: validate.data,
		});

		return Response.json(
			{
				message: "Komen berhasil dibuat",
				data: comment,
			},
			{ status: 201 }
		);
	} catch (error) {
		return Response.json(
			{
				message: "Server error, try again later",
				error: error?.toString(),
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const chapter = await prisma.novel_chapter.findMany();
		return Response.json(
			{
				message: "Chapter novel",
				data: chapter,
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
