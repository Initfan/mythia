"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import SearchNovel from "../search-novel";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useContext } from "react";
import { userContext } from "@/context/user-context";

const Footer = () => {
	const user = useContext(userContext);

	return (
		<footer className="px-[5%] py-6 grid md:grid-cols-2 items-start space-y-5 pb-20">
			<div className="space-y-4">
				<Link href={"/"} className="flex items-center space-x-2">
					<Image
						src={"/mythia-logo.png"}
						alt="mythia application logo"
						width={60}
						height={44}
						priority={true}
					/>
					<h3 className="text-xl font-semibold">Mythia</h3>
				</Link>
				<p className="text-sm text-muted-foreground w-2/3">
					Mythia adalah platform baca novel online yang menyediakan
					berbagai genre dan cerita menarik untuk dinikmati.
				</p>
				<div className="flex space-x-3">
					<Link
						href="https://instagram.com/mythia.novel"
						target="_blank"
					>
						<Instagram />
					</Link>
					<Link
						href="https://twitter.com/mythia.novel"
						target="_blank"
					>
						<Twitter />
					</Link>
				</div>
			</div>
			<div className="flex flex-col md:flex-row space-y-5 justify-between">
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Novel</h2>
					<div className="space-y-2 flex flex-col text-sm">
						{Array.from([
							"Terpopuler",
							"Terbaru",
							"Selesai",
							"Berjalan",
							"Hiatus",
						]).map((v) => (
							<Link
								key={v}
								href=""
								className="hover:underline hover:text-primary"
							>
								{v}
							</Link>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Sumber</h2>
					<div className="space-y-2 flex flex-col text-sm">
						{Array.from([
							"Profile",
							"Pengaturan",
							"Koin",
							"Pustaka",
							"Riwayat",
						]).map((v) => (
							<Link
								key={v}
								href=""
								className="hover:underline hover:text-primary"
							>
								{v}
							</Link>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Lainya</h2>
					<div className="space-y-3">
						<div className="flex items-center space-x-2">
							<Avatar>
								<AvatarFallback>
									{user?.username.slice(0)[0] ?? "U"}
								</AvatarFallback>
							</Avatar>
							<p>{user ? user.username : "User"}</p>
						</div>
						<SearchNovel />
						<Link href={"/write"}>
							<Button>Tulis</Button>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
