import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import UserContext from "@/components/user-context";
import { verifySession } from "@/lib/dal";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
	const { user } = await verifySession();
	if (!user) return null;

	return (
		<>
			<Navigation noLink>
				<div className="space-x-2">
					<Button variant={"ghost"}>Preview</Button>
					<Button variant={"outline"}>Save</Button>
					<Button>Publish</Button>
				</div>
			</Navigation>
			<UserContext user={user}>
				<main className="pt-30 pb-6">{children}</main>
			</UserContext>
		</>
	);
};

export default Layout;
