"use client";
import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import logo from "@/assets/mythia-logo.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const AuthBackground = dynamic(
	() => import("@/components/auth/auth-background"),
	{ ssr: false }
);

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const Login = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const req = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(values),
		});

		await req.json();
		if (req.status == 404) return toast("User not found.");
	};

	return (
		<main className="grid grid-cols-2 space-x-4 h-screen p-4">
			<div className="p-4 relative">
				<div className="absolute">
					<ThemeToggle />
				</div>
				<div className="flex flex-col items-center justify-center h-full space-y-2 w-2/3 mx-auto">
					<Image src={logo} alt="mythia logo" width={75} />
					<h2 className="text-2xl font-semibold">Log In</h2>
					<p className="text-sm text-center">
						Masuk dan rasakan pengalaman membaca novel dengan nyaman
						di mythia.
					</p>
					<Form {...form}>
						<form
							className="py-4 w-full space-y-4"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input {...field} type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className="w-full"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting && (
									<Loader2Icon className="animate-spin" />
								)}
								Submit
							</Button>
						</form>
					</Form>
					<span>
						Belum memiliki akun?{" "}
						<Link
							href={"signup"}
							className="text-blue-500 hover:underline"
						>
							Daftar
						</Link>
					</span>
				</div>
			</div>
			<AuthBackground />
		</main>
	);
};

export default Login;
