import prisma from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const validate = z
			.object({
				rating: z.number(),
				review: z.string().nullable(),
				userId: z.number(),
				novelId: z.number(),
			})
			.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal membuat review novel",
				error: validate.error,
			});

		const review = await prisma.novel_review.create({
			data: validate.data,
		});

		return Response.json(
			{
				message: "Review novel berhasil dibuat",
				data: review,
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
