import Navigation from "@/components/ui/navigation";
import UserContext from "@/context/user-context";
import { verifySession } from "@/lib/dal";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const { user } = await verifySession();
	if (!user) return null;

	return (
		<>
			<Navigation />
			<UserContext user={user}>
				<main className="pt-30 pb-6">{children}</main>
			</UserContext>
		</>
	);
};

export default Layout;
