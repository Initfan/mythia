import Footer from "@/components/home/footer";
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

	return (
		<UserContext user={user!}>
			<Navigation />
			<main className="w-[90vw] mx-auto">{children}</main>
			<Footer user={user!} />
		</UserContext>
	);
};

export default layout;
