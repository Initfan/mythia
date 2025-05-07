import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const verifySession = cache(async () => {
	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.aud) {
		redirect("/signin");
	}

	return { isAuth: true, userId: session.aud };
});

export const getUser = cache(async () => {
	const session = await verifySession();
	if (!session) return null;

	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(session.userId[0]) },
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		return user;
	} catch (error) {
		console.log("Failed to fetch user", error);
		return null;
	}
});
