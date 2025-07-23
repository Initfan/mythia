/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import { userContext } from "@/context/user-context";
import Link from "next/link";
import React, { useContext } from "react";

const page = () => {
	const user = useContext(userContext);

	return (
		<div className="py-5 w-[90vw] mx-auto">
			<Navigation />
			<p>john</p>
			<Link href="/auth/signin">
				<Button className="w-full">Login</Button>
			</Link>
		</div>
	);
};

export default page;
