"use client";
import { History, Home, Library, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavigation = () => {
	const path = usePathname();

	return (
		<nav className="md:hidden fixed inset-x-0 bottom-0 p-4 bg-secondary z-50 flex justify-between">
			<Link
				href="/"
				className={!path.split("/")[1] ? "text-primary" : ""}
			>
				<Home />
			</Link>
			<Link
				href="/history"
				className={path.includes("history") ? "text-primary" : ""}
			>
				<History />
			</Link>
			<Link
				href="/search"
				className={path.includes("search") ? "text-primary" : ""}
			>
				<Search />
			</Link>
			<Link
				href="/library"
				className={path.includes("library") ? "text-primary" : ""}
			>
				<Library />
			</Link>
			<Link
				href="/profile"
				className={path.includes("profile") ? "text-primary" : ""}
			>
				<User />
			</Link>
		</nav>
	);
};

export default MobileNavigation;
