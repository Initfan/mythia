"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MythiaLogo from "@/assets/mythia-logo.png";
import Link from "next/link";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
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
import { BookTextIcon, Coins, LogOut, Settings, User } from "lucide-react";

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
					{user ? (
						<>
							<Button variant="secondary">
								<Link href={"/write"}>Tulis</Link>
							</Button>
							<Link
								href={"/coin/topup"}
								className="flex items-center space-x-1"
							>
								<Button>
									<Coins size={20} />{" "}
									<span>{user.coin} Koin</span>
								</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger className="outline-none cursor-pointer">
									<Avatar>
										{user.author?.image && (
											<AvatarImage
												src={user.author.image}
												alt={user.author.pen_name}
											/>
										)}
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
									<DropdownMenuItem>
										<User />
										<Link href="/dashboard/profile">
											Profile
										</Link>
									</DropdownMenuItem>
									{user.role == "author" && (
										<DropdownMenuItem>
											<BookTextIcon />
											<Link href="/dashboard/novel">
												Novelku
											</Link>
										</DropdownMenuItem>
									)}
									<DropdownMenuItem>
										<Coins />
										<Link href="/dashboard/income">
											Pendapatan
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Settings />
										<Link href="/dashboard/settings">
											Pengaturan
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={logout}
										className="cursor-pointer"
									>
										<LogOut />
										<span className="text-destructive">
											Logout
										</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
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
