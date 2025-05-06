import prisma from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const res = await req.json();
		const user = await prisma.user.create({
			data: res,
		});
		return Response.json(
			{
				data: user,
				message: "User register success",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
	}
}
