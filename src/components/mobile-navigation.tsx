import { History, Home, Library, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileNavigation = () => {
	return (
		<nav className="md:hidden fixed inset-x-0 bottom-0 p-4 bg-secondary z-50 flex justify-between">
			<Link href="/">
				<Home />
			</Link>
			<Link href="/history">
				<History />
			</Link>
			<Link href="/search">
				<Search />
			</Link>
			<Link href="/library">
				<Library />
			</Link>
			<Link href="/profile">
				<User />
			</Link>
		</nav>
	);
};

export default MobileNavigation;
