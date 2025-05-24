import prisma from "@/lib/prisma";

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const author = await prisma.author.findUnique({
			where: { id: parseInt(id) },
		});

		return Response.json({
			message: "Author data",
			data: author,
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
