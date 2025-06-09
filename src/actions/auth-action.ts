"use server";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
	username: z.string().max(30),
	email: z.string().email(),
	password: z.string().min(6),
});

type data = {
	message: string;
	error?: string;
	status?: number;
};

export async function login(
	data: z.infer<ReturnType<typeof formSchema.omit>>
): Promise<data> {
	try {
		const parsed = formSchema.omit({ username: true }).safeParse(data);

		if (!parsed.success) {
			return {
				message: "Invalid input",
				error: JSON.stringify(parsed.error.flatten()),
				status: 400,
			};
		}

		const { email, password } = parsed.data;

		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || user.password != password)
			return {
				message: "User not found",
				status: 404,
			};

		const session = await encrypt({
			aud: user.id.toString(),
			exp: expiresAt.getDate(),
		});

		const cookieStore = await cookies();
		cookieStore.set("session", session, {
			httpOnly: true,
			secure: true,
			expires: expiresAt,
			sameSite: "lax",
			path: "/",
		});

		redirect("/");
	} catch (error) {
		return { message: "Server error, coba lagi.", error: String(error) };
	}
}

export async function register(
	data: z.infer<typeof formSchema>
): Promise<data> {
	try {
		const parsed = formSchema.safeParse(data);

		if (!parsed.success) {
			return {
				message: "Invalid input",
				error: JSON.stringify(parsed.error.flatten()),
				status: 400,
			};
		}

		await prisma.user.create({
			data: parsed.data,
		});

		return {
			message: "User register success",
			status: 201,
		};
	} catch (error) {
		return {
			message: "Server error, coba lagi.",
			error: JSON.stringify(error),
		};
	}
}
