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

		const reviewers = await prisma.novel.update({
			where: { id: parsed.data.novelId },
			data: { reviewd_by: { push: user!.id } },
		});

		return {
			message: "Review novel berhasil dibuat",
			data: review,
			reviewers,
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

export const likeReview = async (id: number) => {
	const { user } = await verifySession();

	await prisma.novel_review.update({
		where: { id },
		data: { liked_by: { push: user!.id }, likes: { increment: 1 } },
	});

	return {
		message: "Memberi like review",
	};
};

export const unlikeReview = async (id: number) => {
	const { user } = await verifySession();

	const likedBy = await prisma.novel_review.findFirst({
		where: { id },
		select: { liked_by: true },
	});

	await prisma.novel_review.update({
		where: { id },
		data: {
			liked_by: { set: likedBy?.liked_by.filter((v) => v != user!.id) },
			likes: { decrement: 1 },
		},
	});

	return {
		message: "Menghapus like review",
	};
};
