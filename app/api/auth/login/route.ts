import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	try {
		const res = await req.json();
		const { email, password } = res;

		const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user || user.password != password)
			return Response.json(
				{ message: "User not found" },
				{ status: 404 }
			);

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

		return Response.json({ message: "User log in success" });
	} catch (error) {
		return Response.json(error);
	}
}
