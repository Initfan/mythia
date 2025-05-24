"use client";
import Image from "next/image";
import React from "react";
import authBackgroundDark from "@/assets/sci-fi.jpg";
import authBackgroundLight from "@/assets/8889.png";
import { useTheme } from "next-themes";

const AuthBackground = () => {
	const theme = useTheme();

	return (
		<div
			className={`size-full ${
				theme.theme == "dark" ? "mix-blend-difference" : ""
			}`}
			suppressHydrationWarning
		>
			{theme.theme == "dark" ? (
				<Image
					src={authBackgroundDark}
					alt="Auth background"
					className="h-full object-cover rounded-xl"
				/>
			) : (
				<Image
					src={authBackgroundLight}
					alt="Auth background"
					className="h-full object-cover rounded-xl"
				/>
			)}
		</div>
	);
};

export default AuthBackground;
