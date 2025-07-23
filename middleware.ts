import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/publish", "/chapter"];
const guestRoutes = ["/auth/signin", "/auth/signup"];
const groupProtectedRoutes = ["/dashboard"];
// const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	// const isPublicRoute = publicRoutes.includes(path);
	const isProtectedRoute = protectedRoutes.includes(path);
	const isGuestRoute = guestRoutes.includes(path);
	const isGroupProtected = groupProtectedRoutes.some((route) =>
		path.startsWith(route)
	);

	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	if (isGroupProtected && !session) {
		return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
	}

	if (isProtectedRoute && !session?.aud) {
		return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
	}

	if (isGuestRoute && session?.aud) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
