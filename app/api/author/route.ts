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

				userId: z.number(),
			})
			.safeParse(data);

		if (validate.error) return Response.json(validate.error);

		const author = await prisma.author.create({
			data: {
				...validate.data,
				image: "https://jygqe5edc8.ufs.sh/f/TflkBZUONMuW9Asj5W26r5iZ0xqUuNg7QztGyaSs2ob1AdLk",
			},
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
