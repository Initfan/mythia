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
		<div className="px-[5%] py-6 grid grid-cols-2 items-start gap-8">
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
				<p className="text-sm text-muted-foreground w-1/2">
					Mythia adalah platform baca novel online yang menyediakan
					berbagai genre dan cerita menarik untuk dinikmati.
				</p>
				<div className="flex space-x-3">
					<Link href="instagram.com/mythia.novel">
						<Instagram />
					</Link>
					<Link href=".twittercom/mythia.novel">
						<Twitter />
					</Link>
				</div>
			</div>
			<div className="flex space-x-10">
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Novel</h2>
					<div className="space-y-1 flex flex-col text-sm">
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
					<div className="space-y-1 flex flex-col text-sm">
						{Array.from([
							"Profile",
							"Pengaturan",
							"Koin",
							"Pustaka",
							"Riwayar",
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
				<div className="space-y-4 flex-1">
					<h2 className="text-xl font-semibold">Lainya</h2>
					<div className="space-y-3">
						{user && (
							<div className="flex items-center space-x-2">
								<Avatar>
									{/* <AvatarImage>
										{user.}
									</AvatarImage> */}
									<AvatarFallback>
										{user.username.slice(0)[0]}
									</AvatarFallback>
								</Avatar>
								<p>{user.username}</p>
							</div>
						)}
						<SearchNovel />
						{user && (
							<>
								<Link href={"/write"}>
									<Button>Tulis</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
