import Image from "next/image";
import React from "react";
import MythiaLogo from "@/assets/mythia-logo.png";
import Link from "next/link";
import { Button } from "./button";
import { Search } from "lucide-react";

const Navigation = () => {
	return (
		<nav className="flex items-center justify-between py-5 absolute inset-x-0 w-[90%] m-auto">
			<div className="flex items-center space-x-2">
				<Image
					src={MythiaLogo}
					alt="mythia application logo"
					width={60}
				/>
				<h3 className="text-xl font-semibold">Mythia</h3>
			</div>
			<div className="flex space-x-8">
				<Link href="/">Originals</Link>
				<Link href="/">Discover</Link>
				<Link href="/">Trending</Link>
				<Link href="/">Contests</Link>
			</div>
			<div className="flex space-x-3">
				<Button variant={"ghost"}>
					<Search />
				</Button>
				<Button>Publish</Button>
				<Button variant={"outline"}>Log In</Button>
			</div>
		</nav>
	);
};

export default Navigation;
