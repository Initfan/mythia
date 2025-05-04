import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import logo from "@/assets/mythia-logo.png";
import AuthBackground from "@/components/auth/auth-background";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Login = () => {
	return (
		<main className="grid grid-cols-2 space-x-4 h-screen p-4">
			<div className="p-4 relative">
				<div className="absolute">
					<ThemeToggle />
				</div>
				<div className="flex flex-col items-center justify-center h-full space-y-2 w-2/3 mx-auto">
					<Image src={logo} alt="mythia logo" width={75} />
					<h2 className="text-2xl font-semibold">Sign Up</h2>
					<p className="text-sm text-center">
						Daftar dan nikmati kesuruan membaca novel di mythia.
					</p>
					<form className="py-4 w-full space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" name="username" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" />
						</div>
						<div className="flex justify-between">
							<div>
								<Checkbox /> Remember me
							</div>
							<Link href="">Forgot password</Link>
						</div>
						<Button className="w-full">Submit</Button>
					</form>
					<span>
						Already have account?{" "}
						<Link
							href={"signin"}
							className="text-blue-500 hover:underline"
						>
							Sign In
						</Link>
					</span>
				</div>
			</div>
			<AuthBackground />
		</main>
	);
};

export default Login;
