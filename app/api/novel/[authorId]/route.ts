import prisma from "@/lib/prisma";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ authorId: string }> }
) {
	try {
		const { authorId } = await params;
		const novel = await prisma.novel.findFirst({
			where: { authorId: parseInt(authorId) },
		});

		return Response.json({
			message: "Novel data",
			data: novel,
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
