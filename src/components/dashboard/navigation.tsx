import Image from "next/image";
import Link from "next/link";
import MythiaLogo from "@/assets/mythia-logo.png";
import { Button } from "../ui/button";
import { logout } from "@/actions/user-action";

const DashboardNavigation = () => {
	return (
		<div className="flex items-center justify-between py-6">
			<div className="flex items-center">
				<Link href={"/"} className="flex items-center space-x-2">
					<Image
						src={MythiaLogo}
						alt="mythia application logo"
						width={60}
						priority={true}
					/>
					<h3 className="text-xl font-semibold">Mythia</h3>
				</Link>
				<div className="mx-8 space-x-3 flex items-center">
					<Link href={"/dashboard/profile"}>Profile</Link>
					<Link href={"/dashboard/novel"}>Novel</Link>
				</div>
			</div>
			<Button variant="destructive" onClick={logout}>
				Logout
			</Button>
		</div>
	);
};

export default DashboardNavigation;
