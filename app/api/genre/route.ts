import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const genre = await prisma.genre.findMany();

		return Response.json({
			data: genre,
			message: "Genre data",
		});
	} catch (error) {
		return Response.json(error);
	}
}
