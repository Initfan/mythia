"use client";
import Image from "next/image";
import React, { useContext } from "react";
import MythiaLogo from "@/assets/mythia-logo.png";
import Link from "next/link";
import { Button } from "./button";
import { Search } from "lucide-react";
import { Input } from "./input";
import { Avatar, AvatarFallback } from "./avatar";
import { userContext } from "@/context/user-context";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./dropdown-menu";

interface props {
	children?: React.ReactNode;
	noLink?: boolean;
}

const Navigation = ({ children, noLink = false }: props) => {
	const user = useContext(userContext);

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
						Pustaka
					</Link>
					<Link
						href="/history"
						className="text-sm font-semibold hover:underline"
					>
						Riwayat
					</Link>
				</div>
			</div>
			{!noLink && (
				<div className="hidden md:flex space-x-3 items-center">
					<Button variant="outline">
						<Search />
					</Button>
					<Input placeholder="Cari novel..." />
					{user ? (
						<>
							<Link href={"/write"}>
								<Button>Tulis</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarFallback>
											{user.username
												.slice(0, 1)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										{user.username}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/dashboard">Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>Tulis</DropdownMenuItem>
									<DropdownMenuItem>Coins</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<>
							<Link href={"/auth/signin"}>
								<Button variant={"outline"}>Log In</Button>
							</Link>
						</>
					)}
				</div>
			)}
			{children}
		</nav>
	);
};

export default Navigation;
