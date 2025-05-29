import Image from "next/image";
import React from "react";
import MythiaLogo from "@/assets/mythia-logo.png";
import Link from "next/link";
import { Button } from "./button";
import { Search, User2 } from "lucide-react";
import { verifySession } from "@/lib/dal";
import { Input } from "./input";

interface props {
	children?: React.ReactNode;
	noLink?: boolean;
}

const Navigation = async ({ children, noLink = false }: props) => {
	const session = await verifySession();

	return (
		<nav className="flex items-center justify-between py-5 absolute px-[5%] w-full m-auto shadow-md">
			<div className="space-x-12 flex items-center">
				<Link href={"/"} className="flex items-center space-x-2">
					<Image
						src={MythiaLogo}
						alt="mythia application logo"
						width={60}
					/>
					<h3 className="text-xl font-semibold">Mythia</h3>
				</Link>
				<div className="space-x-6 hidden lg:block">
					<Link
						href="/browse"
						className="text-sm font-semibold hover:underline"
					>
						Temukan
					</Link>
					<Link
						href="/library"
						className="text-sm font-semibold hover:underline"
					>
						Library
					</Link>
				</div>
			</div>
			{!noLink && (
				<div className="hidden md:flex space-x-3">
					<Button variant="outline">
						<Search />
					</Button>
					<Input placeholder="Cari novel..." />
					{session.isAuth && (
						<Link href={"/write"}>
							<Button>Tulis</Button>
						</Link>
					)}
					{!session.isAuth && (
						<Link href={"/auth/signin"}>
							<Button variant={"outline"}>Log In</Button>
						</Link>
					)}
					{session.isAuth && (
						<Link href={`/profile/${session.user?.username}`}>
							<Button variant={"link"}>
								<User2 />
								Profile
							</Button>
						</Link>
					)}
				</div>
			)}
			{children}
		</nav>
	);
};

export default Navigation;
