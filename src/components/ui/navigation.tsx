"use client";
import Image from "next/image";
import React, { useActionState, useContext, useRef } from "react";
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
import { Input } from "./input";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface props {
	children?: React.ReactNode;
	noLink?: boolean;
	noSearch?: boolean;
}

const Navigation = ({ children, noLink = false, noSearch = false }: props) => {
	const user = useContext(userContext);
	const router = useRouter();
	const ref = useRef<HTMLInputElement>(null);

	const handleSubmit = (): boolean => {
		if (ref.current?.value.trim().length == 0) return false;
		router.push(`/search?title=${ref.current?.value}`);
		return true;
	};

	const [, action, pending] = useActionState(handleSubmit, false);

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
				<div className="space-x-6 hidden lg:block">
					<Link
						href="/browse"
						className="text-sm font-medium hover:underline"
					>
						Temukan
					</Link>
					<Link
						href="/library"
						className="text-sm font-medium hover:underline"
					>
						Pustaka
					</Link>
					<Link
						href="/history"
						className="text-sm font-medium hover:underline"
					>
						Riwayat
					</Link>
				</div>
			</div>
			{!noLink && (
				<div className="hidden md:flex space-x-2 items-center">
					{!noSearch && (
						<form action={action} className="flex space-x-1">
							<Input
								placeholder="Cari novel..."
								ref={ref}
								className="w-[300px]"
							/>
							<Button
								variant="outline"
								type="submit"
								disabled={pending}
							>
								{pending ? (
									<Loader2 className="animate-spin" />
								) : (
									<Search />
								)}
							</Button>
						</form>
					)}
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
								<DropdownMenuItem>Koin</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Pengaturan</DropdownMenuItem>
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
