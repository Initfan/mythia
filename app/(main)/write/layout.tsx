import UserContext from "@/context/user-context";
import { verifySession } from "@/lib/dal";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const { user } = await verifySession();
	if (!user) return null;

	return <UserContext user={user}>{children}</UserContext>;
};

export default Layout;
