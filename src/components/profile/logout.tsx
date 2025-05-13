"use client";
import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const Logout = () => {
	const logoutHandler = async () => {
		const req = await fetch("/api/auth/logout");
		await req.json();
		return redirect("/");
	};

	return (
		<Button variant="destructive" onClick={logoutHandler}>
			logout
		</Button>
	);
};

export default Logout;
