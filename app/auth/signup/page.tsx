"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/mythia-logo.png";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2Icon, LogIn } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const formSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});

const Login = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const req = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(values),
		});

		await req.json();
		if (req.status == 201)
			toast("Akun berhasil dibuat", {
				description: "Login untuk lanjut membaca.",
				action: {
					label: <LogIn />,
					onClick: () => redirect("../signin"),
				},
			});
		else toast("Server bermasalah, coba lagi nanti.");
	};

	return (
		<div className="flex flex-col items-center justify-center h-full space-y-2 w-full md:w-1/2 lg:w-2/3 mx-auto pt-12 md:pt-0">
			<Image src={logo} alt="mythia logo" width={75} />
			<h2 className="text-2xl font-semibold">Daftar</h2>
			<p className="text-sm text-center">
				Daftar dan nikmati kesuruan membaca novel di mythia.
			</p>
			<Form {...form}>
				<form
					className="py-4 w-full space-y-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
				Sudah memiliki akun?{" "}
				<Link
					href={"/auth/signin"}
					className="text-blue-500 hover:underline"
				>
					Log In
				</Link>
			</span>
		</div>
	);
};

export default Login;
