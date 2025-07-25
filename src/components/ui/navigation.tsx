"use client";
import Image from "next/image";
import React, { useContext } from "react";
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
import {
	BookTextIcon,
	Coins,
	LogOut,
	Settings,
	User,
	Search,
	SquarePen,
} from "lucide-react";
import Link from "next/link";
import { logout } from "@/actions/user-action";

const Navigation = () => {
	const user = useContext(userContext);

	return (
		<nav className="py-5 flex justify-between items-center">
			<Image
				src={"/mythia-logo.png"}
				alt="mythia logo"
				width={75}
				height={75}
			/>
			<div className="flex space-x-3">
				<Link href={"/search"}>
					<Button size={"icon"} variant={"secondary"}>
						<Search />
					</Button>
				</Link>
				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="outline-none cursor-pointer">
							<Avatar>
								{user.author?.image && (
									<AvatarImage
										src={user.author.image}
										alt={user.author.pen_name}
									/>
								)}
								<AvatarFallback className="bg-primary">
									{user.username.slice(0, 1).toUpperCase()}
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
								<Link href="/dashboard/profile">Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<SquarePen />
								<Link href="/write">Tulis Novel</Link>
							</DropdownMenuItem>
							{user.role == "author" && (
								<>
									<DropdownMenuItem>
										<BookTextIcon />
										<Link href="/dashboard/novel">
											Novelku
										</Link>
									</DropdownMenuItem>

									<DropdownMenuItem>
										<Coins />
										<Link href="/dashboard/income">
											Pendapatan
										</Link>
									</DropdownMenuItem>
								</>
							)}
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Settings />
								<Link href="/dashboard/settings">
									Pengaturan
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={logout}
								className="cursor-pointer text-destructive"
							>
								<LogOut />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link href="/auth/signin">
						<Button>Log In</Button>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
