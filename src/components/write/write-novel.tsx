import { FileUploadThing } from "@/components/write/file-upload";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { uploadFiles } from "@/lib/uploadthing";
import { author, genre } from "@/generated/prisma";
import { userContext } from "../../context/user-context";
import { Textarea } from "../ui/textarea";
import { Loader2Icon, Send } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const schema = z.object({
	title: z.string().min(4),
	genre: z.string(),
	synopsis: z.string(),
	target_audience: z.enum(["male", "female"]),
	content_rating: z.enum(["semua umur", "6+", "12+", "17+", "21+"]),
});

const WriteNovel = ({ activePage }: { activePage: (id: number) => void }) => {
	const user = useContext(userContext);
	const tagRef = useRef<HTMLInputElement>(null);
	const [author, setAuthor] = useState<author>();
	const [tag, setTag] = useState<string[]>([]);
	const [genre, setGenre] = useState<genre[]>();
	const [files, setFile] = useState<File[]>([]);
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: "",
			content_rating: "semua umur",
			genre: "",
			synopsis: "",
			target_audience: "male",
		},
	});

	const onSubmit = async (values: z.infer<typeof schema>) => {
		try {
			console.log(user);
			const image = await uploadFiles("imageUploader", {
				files,
			});
			const novel = await fetch("api/novel", {
				method: "POST",
				body: JSON.stringify({
					...values,
					cover: image[0].ufsUrl,
					authorId: user!.author ? user?.author.id : author?.id,
					tag_novel: tag,
				}),
			});

			await novel.json();
			if (novel.status == 201) activePage(3);
		} catch (err) {
			console.log(err);
			toast("Gagal membuat novel, coba lagi", {
				className: "bg-red-500",
			});
		}
	};

	const onUpload = (file: File) => setFile([file]);

	const fetchGenre = async () => {
		const req = await fetch("api/genre");
		const res = await req.json();
		setGenre(res.data);
	};

	const getAuthor = useCallback(async () => {
		if (user?.author) return;
		const req = await fetch(`/api/author/${user?.id}`);
		const res = await req.json();
		if (req.ok) setAuthor(res.data);
	}, [user]);

	useEffect(() => {
		fetchGenre();
		getAuthor();
	}, [getAuthor]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="flex space-x-4 w-full mb-4">
					<div className="space-y-4 flex flex-col">
						<h1 className="text-xl font-semibold">Cover novel</h1>
						<div className="h-[300px] w-[200px]">
							<FileUploadThing onUpload={onUpload} />
						</div>
					</div>
					<div className="flex-1 space-y-4">
						<h1 className="text-xl font-semibold">Detail novel</h1>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Judul</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="synopsis"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sinopsis</FormLabel>
									<Textarea {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="genre"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Genre</FormLabel>
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
												{genre?.map((v) => (
													<SelectItem
														value={v.genre}
														key={v.genre}
													>
														{v.genre}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="target_audience"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Target Audience</FormLabel>
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
												<SelectItem value={"male"}>
													Male
												</SelectItem>
												<SelectItem value={"female"}>
													Female
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
							name="content_rating"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rating Konten</FormLabel>
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
												<SelectItem
													value={"semua umur"}
												>
													Semua Umur
												</SelectItem>
												<SelectItem value={"6+"}>
													6+
												</SelectItem>
												<SelectItem value={"12+"}>
													12+
												</SelectItem>
												<SelectItem value={"17+"}>
													17+
												</SelectItem>
												<SelectItem value={"21+"}>
													21+
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-y-2">
							<FormLabel>Tag</FormLabel>
							<div className="flex space-x-4">
								<Input
									ref={tagRef}
									onKeyDown={(e) => {
										if (e.key == "Enter") {
											e.preventDefault();
											setTag((p) => [
												...p,
												tagRef.current!.value,
											]);
										}
									}}
								/>
								<Button
									onClick={(e) => {
										e.preventDefault();
										const avail = tag.includes(
											tagRef.current!.value
										);
										if (!avail)
											setTag((p) => [
												...p,
												tagRef.current!.value,
											]);
									}}
								>
									<Send />
								</Button>
							</div>
							<div className="flex space-x-2">
								{tag?.map((v) => (
									<Button
										key={v}
										size="sm"
										onClick={(e) => {
											e.preventDefault();
											const remain = tag.filter(
												(p) => p !== v
											);
											setTag(remain);
										}}
									>
										{v}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting}
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

export default WriteNovel;
