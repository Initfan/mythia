"use server";

// import { verifySession } from "@/lib/dal";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
	const session = await cookies();
	session.delete("session");
	return redirect("/");
}
