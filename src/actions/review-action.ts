"use server";
import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
	rating: z.number(),
	review: z.string().nullable(),
	novelId: z.number(),
});

export async function createReview(value: z.infer<typeof schema>) {
	const { user } = await verifySession();

	try {
		const parsed = schema.safeParse(value);

		if (parsed.error)
			return {
				message: "Gagal memberi review",
				error: parsed.error.flatten().fieldErrors,
			};

		const review = await prisma.novel_review.create({
			data: { ...parsed.data, userId: user!.id },
			include: { user: true },
		});

		return {
			message: "Review novel berhasil dibuat",
			data: review,
			status: 201,
		};
	} catch (error) {
		return {
			message: "Server error, try again later",
			error: JSON.stringify(error),
			status: 500,
		};
	}
}
