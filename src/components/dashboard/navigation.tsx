"use client";
import Image from "next/image";
import Link from "next/link";
import MythiaLogo from "@/assets/mythia-logo.png";
import { Button } from "../ui/button";
import { logout } from "@/actions/user-action";
import { Book, Coins, User2 } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardNavigation = () => {
	const active = usePathname().split("/")[2];

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
			</div>
			<div className="space-x-3 flex items-center">
				<div className="space-x-1 flex">
					<Link href={"profile"}>
						<Button
							variant="link"
							className={
								active == "profile"
									? "text-primary"
									: "text-white"
							}
						>
							<User2 />
							Profile
						</Button>
					</Link>
					<Link href={"novel"}>
						<Button
							variant="link"
							className={
								active == "novel"
									? "text-primary"
									: "text-white"
							}
						>
							<Book />
							Novel
						</Button>
					</Link>
					<Link href={"income"}>
						<Button
							variant="link"
							className={
								active == "income"
									? "text-primary"
									: "text-white"
							}
						>
							<Coins />
							Pendapatan
						</Button>
					</Link>
				</div>
				<Button variant="destructive" onClick={logout}>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default DashboardNavigation;
