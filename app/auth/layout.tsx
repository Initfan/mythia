"use client";
import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import dynamic from "next/dynamic";

const AuthBackground = dynamic(
	() => import("@/components/auth/auth-background"),
	{ ssr: false }
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="grid grid-cols-2 space-x-4 h-screen p-4">
			<div className="p-4 relative">
				<div className="absolute">
					<ThemeToggle />
				</div>
				{children}
			</div>
			<AuthBackground />
		</main>
	);
};

export default AuthLayout;
