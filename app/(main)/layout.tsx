import Navigation from "@/components/ui/navigation";
import UserContext from "@/context/user-context";
import { verifySession } from "@/lib/dal";
import React from "react";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { user } = await verifySession();
	if (!user) return null;

	return (
		<UserContext user={user}>
			<Navigation />
			<main className="pt-30 pb-6 w-[90vw] mx-auto">{children}</main>
		</UserContext>
	);
};

export default layout;
