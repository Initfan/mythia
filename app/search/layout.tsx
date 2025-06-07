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
			<div className="h-screen flex flex-col">
				<Navigation />
				<main className="w-[90vw] mx-auto flex-1 overflow-hidden">
					{children}
				</main>
			</div>
		</UserContext>
	);
};

export default layout;
