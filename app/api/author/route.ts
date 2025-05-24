import prisma from "@/lib/prisma";
import { z } from "zod";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const validate = z
			.object({
				pen_name: z.string().min(4),
				gender: z.string(),
				email: z.string().email(),
				phone: z.string().min(9),
				image: z.string(),
				userId: z.number(),
			})
			.safeParse(data);

		if (validate.error) return Response.json(validate.error);

		const author = await prisma.author.create({
			data: validate.data,
		});

		return Response.json(
			{
				message: "Profile author berhasil disimpan",
				data: author,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{ message: "Server error, try again later", error },
			{ status: 500 }
		);
	}
}
