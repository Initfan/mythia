import prisma from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const validate = z
			.object({
				title: z.string(),
				content: z.string(),
				novelId: z.number(),
			})
			.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal menambah chapter novel",
				error: validate.error,
			});

		const novel = await prisma.novel_chapter.create({
			data: { ...validate.data },
		});

		return Response.json(
			{
				message: "Chapter novel berhasil dibuat",
				data: novel,
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
