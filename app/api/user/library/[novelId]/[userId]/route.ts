import prisma from "@/lib/prisma";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ novelId: string; userId: string }> }
) {
	try {
		const { novelId, userId } = await params;
		const library = await prisma.user_library.findFirstOrThrow({
			where: { novelId: parseInt(novelId), userId: parseInt(userId) },
		});

		return Response.json({
			message: "Novel sudah ada di library user",
			data: library,
		});
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
