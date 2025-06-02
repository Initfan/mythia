import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import prisma from "./prisma";

export const verifySession = cache(async () => {
	const cookie = (await cookies()).get("session")?.value;
	if (!cookie) return { isAuth: false };

	const session = await decrypt(cookie);

	if (!session?.aud) return { isAuth: false };

	const user = await prisma.user.findUnique({
		where: { id: parseInt(session.aud as string) },
		include: { author: true },
	});

	return { isAuth: true, userId: session.aud, user };
});
