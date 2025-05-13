import { cookies } from "next/headers";

export async function GET() {
	const session = await cookies();
	session.delete("session");
	return Response.json({ message: "User logout success" });
}
