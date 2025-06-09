"use client";
import React, { useContext, useState } from "react";
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { FileUploadThing } from "./file-upload";
import { uploadFiles } from "@/lib/uploadthing";
import { userContext } from "@/context/user-context";
import { toast } from "sonner";
import { createAuthorProfile } from "@/actions/author-action";

const schema = z.object({
	pen_name: z.string().min(4),
	gender: z.string(),
	email: z.string().email(),
	phone: z.string().min(9),
});

const WriterProfile = ({
	activePage,
}: {
	activePage: (id: number) => void;
}) => {
	const user = useContext(userContext);

	const [agreement, setAgreement] = useState<boolean>(false);
	const [files, setFile] = useState<File[]>([]);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			pen_name: "",
			gender: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof schema>) => {
		try {
			const image = await uploadFiles("imageUploader", {
				files,
			});
			const author = await createAuthorProfile({
				...values,
				image: image[0].ufsUrl,
				userId: user!.id,
			});

			if (author.error)
				return toast("Gagal membuat profile, coba lagi", {
					className: "bg-red-500",
				});

			if (author.data) activePage(2);
		} catch {
			toast("Gagal membuat profile, coba lagi", {
				className: "bg-red-500",
			});
		}
	};

	const onUpload = (file: File) => setFile([file]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="flex flex-col md:flex-row md:space-y-0 space-y-4 md:space-x-4 w-full mb-4">
					<div className="space-y-2 flex flex-col md:w-[30%]">
						<h3 className="text-xl">Foto Profile</h3>
						<FileUploadThing onUpload={onUpload} />
					</div>
					<div className="space-y-4 flex-1">
						<FormField
							control={form.control}
							name="pen_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Pena</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis Kelamin</FormLabel>
									<Select
										name={field.name}
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Pilih" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="pria">
													Pria
												</SelectItem>
												<SelectItem value="wanita">
													Wanita
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<Input {...field} />
									<FormMessage />
									<FormDescription>
										Email professional untuk di hubungi
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nomor Telepon</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center space-x-2">
							<Checkbox
								onCheckedChange={() => setAgreement((p) => !p)}
							/>
							<p className="text-sm">
								I Have read and accept the terms.{" "}
								<Link
									href={"/write-agreement"}
									className="text-blue-500"
								>
									Agreement
								</Link>
							</p>
						</div>
					</div>
				</div>
				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting || !agreement}
				>
					{form.formState.isSubmitting && (
						<Loader2Icon className="animate-spin" />
					)}
					Selanjutnya
				</Button>
			</form>
		</Form>
	);
};

export default WriterProfile;
