import prisma from "@/lib/prisma";
import { z } from "zod";

export async function PUT(req: Request) {
	try {
		const data = await req.json();

		const validate = z
			.object({
				reviewId: z.number(),
				userId: z.number(),
			})
			.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal menyukai review novel",
				error: validate.error,
			});

		const review = await prisma.novel_review.update({
			where: { id: validate.data.reviewId },
			data: {
				liked_by: { push: validate.data.userId },
				likes: {
					increment: 1,
				},
			},
		});

		return Response.json(
			{
				message: "Review novel berhasil disukai",
				data: review.likes,
			},
			{ status: 200 }
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

export async function DELETE(req: Request) {
	try {
		const data = await req.json();

		const validate = z
			.object({
				reviewId: z.number(),
				userId: z.number(),
			})
			.safeParse(data);

		if (validate.error)
			return Response.json({
				message: "Gagal menghapus like review novel",
				error: validate.error,
			});

		const existingReview = await prisma.novel_review.findUnique({
			where: { id: validate.data.reviewId },
			select: { liked_by: true },
		});

		if (!existingReview) {
			return Response.json(
				{
					message: "Review not found",
				},
				{ status: 404 }
			);
		}

		const updatedLikedBy = (existingReview.liked_by as number[]).filter(
			(id) => id !== validate.data.userId
		);

		const review = await prisma.novel_review.update({
			where: { id: validate.data.reviewId },
			data: {
				liked_by: updatedLikedBy,
				likes: {
					decrement: 1,
				},
			},
		});

		return Response.json(
			{
				message: "Like review novel berhasil dihapus",
				data: review.likes,
			},
			{ status: 200 }
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
