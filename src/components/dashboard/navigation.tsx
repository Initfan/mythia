import Image from "next/image";
import Link from "next/link";
import MythiaLogo from "@/assets/mythia-logo.png";
import { Button } from "../ui/button";
import { logout } from "@/actions/user-action";

const DashboardNavigation = () => {
	return (
		<div className="flex items-center justify-between py-6">
			<Link href={"/"} className="flex items-center space-x-2">
				<Image
					src={MythiaLogo}
					alt="mythia application logo"
					width={60}
					priority={true}
				/>
				<h3 className="text-xl font-semibold">Mythia</h3>
			</Link>
			<Button variant="destructive" onClick={logout}>
				Logout
			</Button>
		</div>
	);
};

export default DashboardNavigation;
