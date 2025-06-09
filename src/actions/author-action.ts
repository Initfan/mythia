"use server";
import { author } from "@/generated";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
	pen_name: z.string().min(4),
	gender: z.string(),
	email: z.string().email(),
	phone: z.string().min(9),
	image: z.string(),
	userId: z.number(),
});

type response = {
	message: string;
	data?: author;
	status?: number;
	error?: string;
};

export async function createAuthorProfile(
	data: z.infer<typeof schema>
): Promise<response> {
	try {
		const parsed = schema.safeParse(data);

		if (!parsed.success)
			return {
				message: "Gagal membuat profil author",
				error: JSON.stringify(parsed.error.flatten().fieldErrors),
			};

		const author = await prisma.author.create({
			data: parsed.data,
		});

		await prisma.user.update({
			where: { id: author.userId },
			data: { role: "author" },
		});

		return {
			message: "Profile author berhasil di simpan",
			data: author,
			status: 201,
		};
	} catch (error) {
		return {
			message: "Server error, try again later",
			error: JSON.stringify(error),
		};
	}
}
