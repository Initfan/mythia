import prisma from "@/lib/prisma";

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const user = await prisma.user.update({
			where: { id: parseInt(id) },
			data: { role: "author" },
		});

		return Response.json({
			message: "User role telah menjadi author",
			data: user,
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
