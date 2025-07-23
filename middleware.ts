import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/publish", "/chapter", "/write", "/profile"];
const guestRoutes = ["/auth/signin", "/auth/signup"];
const groupProtectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const path = req.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.includes(path);
	const isGuestRoute = guestRoutes.includes(path);
	const isGroupProtected = groupProtectedRoutes.some((route) =>
		path.startsWith(route)
	);

	const cookie = req.cookies.get("session")?.value;
	const session = await decrypt(cookie);

	if (isGroupProtected && !session) {
		url.pathname = "/auth/signin";
		return NextResponse.redirect(url);
	}

	if (isProtectedRoute && !session?.aud) {
		url.pathname = "/auth/signin";
		return NextResponse.redirect(url);
	}

	if (isGuestRoute && session?.aud) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"], // matches all non-static paths
};
