"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MythiaLogo from "@/assets/mythia-logo.png";
import Link from "next/link";
import { Button } from "./button";
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
import SearchNovel from "../search-novel";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./navigation-menu";
import { genre } from "@/generated";
import { getAllGenre } from "@/actions/novel-action";
import { logout } from "@/actions/user-action";

interface props {
	children?: React.ReactNode;
	noLink?: boolean;
	noSearch?: boolean;
}

const Navigation = ({ children, noLink = false, noSearch = false }: props) => {
	const user = useContext(userContext);
	const [genre, setGenre] = useState<genre[]>();

	useEffect(() => {
		getAllGenre().then((res) => setGenre(res));
	}, []);

	return (
		<nav className="flex items-center justify-between py-6 px-[5%] w-full m-auto shadow-md">
			<div className="space-x-12 flex items-center">
				<Link href={"/"} className="flex items-center space-x-2">
					<Image
						src={MythiaLogo}
						alt="mythia application logo"
						width={60}
						priority={true}
					/>
					<h3 className="text-xl font-semibold">Mythia</h3>
				</Link>
				<div className="space-x-6 hidden lg:flex items-center">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Temukan
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="flex space-x-2 w-[300px] flex-wrap">
										{genre?.map((component) => (
											<NavigationMenuLink
												key={component.id}
												title={component.genre}
												href={`/search?filter=genre&value=${component.genre}`}
											>
												{component.genre}
											</NavigationMenuLink>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href="/library">
									Pustaka
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink href="/history">
									Riwayat
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
			{!noLink && (
				<div className="hidden md:flex space-x-2 items-center">
					{!noSearch && <SearchNovel />}
					<Link href={"/write"}>
						<Button>Tulis</Button>
					</Link>
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none cursor-pointer">
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
									Halo, {user.username.split(" ")[0]}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								{user.role == "author" && (
									<DropdownMenuItem>
										<Link href="/dashboard/novel">
											Novelku
										</Link>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem>Koin</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Pengaturan</DropdownMenuItem>
								<DropdownMenuItem>
									<span
										className="text-destructive"
										onClick={logout}
									>
										Logout
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link href={"/auth/signin"}>
							<Button variant={"outline"}>Log In</Button>
						</Link>
					)}
				</div>
			)}
			{children}
		</nav>
	);
};

export default Navigation;
