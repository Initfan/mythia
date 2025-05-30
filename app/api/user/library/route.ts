import prisma from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const { userId, novelId } = await req.json();

		const validate = z
			.object({
				userId: z.number(),
				novelId: z.number(),
			})
			.safeParse({ userId, novelId });

		if (validate.error) return Response.json(validate.error);

		const library = await prisma.user_library.create({
			data: {
				userId,
				novelId,
			},
		});

		if (!library)
			return Response.json(
				{ message: "Failed to add novel into library" },
				{ status: 400 }
			);

		return Response.json(
			{ message: "Novel added to library successfully!", data: library },
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{ message: "Failed to add novel to library", error },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const { id } = await req.json();
		await prisma.user_library.delete({
			where: { id: parseInt(id) },
		});

		return Response.json({
			message: "Novel removed from library",
		});
	} catch (error) {
		console.log(error);
		return Response.json(
			{
				message: "Server error, try again later",
				error,
			},
			{ status: 500 }
		);
	}
}
