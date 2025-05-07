import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/profile"];
const guestRoutes = ["/auth/signin", "/auth/signup"];
// const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	// const isPublicRoute = publicRoutes.includes(path);
	const isGuestRoute = guestRoutes.includes(path);

	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	if (isProtectedRoute && !session?.aud) {
		return NextResponse.redirect(new URL("auth/signin", req.nextUrl));
	}

	if (isGuestRoute && session?.aud) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
