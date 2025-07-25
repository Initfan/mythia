import { FileUploadThing } from "@/components/write/file-upload";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { uploadFiles } from "@/lib/uploadthing";
import { Loader2Icon, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createNovel, getAllGenre, updateCover } from "@/actions/novel-action";
import { genre } from "@/generated";
import Editor from "./editor";
import { Skeleton } from "../ui/skeleton";

const schema = z.object({
	title: z.string().min(4),
	genre: z.string(),
	synopsis: z.string(),
	target_audience: z.enum(["male", "female"]),
	content_rating: z.enum(["semua umur", "6+", "12+", "17+", "21+"]),
});

const WriteNovel = ({
	activePage,
	onSetNovelId,
}: {
	activePage: (id: number) => void;
	onSetNovelId: (id: number) => void;
}) => {
	const tagRef = useRef<HTMLInputElement>(null);
	const [tag, setTag] = useState<string[]>([]);
	const [synopsis, setSinopsis] = useState("");
	const [genre, setGenre] = useState<genre[]>();
	const [pending, transition] = useTransition();
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

	useEffect(() => {
		transition(
			async () => await getAllGenre().then((res) => setGenre(res))
		);
	}, []);

	const onSubmit = async (values: z.infer<typeof schema>) => {
		try {
			const novel = await createNovel({
				...values,
				synopsis,
				tag_novel: tag,
			});

			if (novel?.error) return toast("Gagal membuat novel");

			const image = await uploadFiles("imageUploader", {
				files,
			});

			updateCover(novel!.data!.id, image[0].ufsUrl);

			toast("Novel berhasil dibuat");
			onSetNovelId(novel!.data!.id);

			if (novel?.data) activePage(3);
		} catch {
			toast("Gagal membuat novel, coba lagi", {
				className: "bg-red-500",
			});
		}
	};

	const onUpload = (file: File) => setFile([file]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full pb-4"
			>
				<div className="flex flex-col md:flex-row md:space-y-0 space-y-4 md:space-x-4 w-full mb-4">
					<div className="space-y-4 flex flex-col">
						<h1 className="text-xl font-semibold">Cover novel</h1>
						<div className="h-[300px] md:w-[200px]">
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
									<Editor
										{...field}
										placeholder="Sinopsis cerita..."
										setContent={(v) => setSinopsis(v)}
									/>
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
											{pending && (
												<Skeleton className="h-4" />
											)}
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
									<FormLabel>Target Pembaca</FormLabel>
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
													Pria
												</SelectItem>
												<SelectItem value={"female"}>
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
											tagRef.current!.value = "";
										}
									}}
								/>
								<Button
									onClick={(e) => {
										e.preventDefault();
										const avail = tag.includes(
											tagRef.current!.value
										);
										if (!avail) {
											setTag((p) => [
												...p,
												tagRef.current!.value,
											]);
											tagRef.current!.value = "";
										}
									}}
								>
									<Send />
								</Button>
							</div>
							<FormDescription>
								Memudahkan pencarian novel
							</FormDescription>
							<div className="flex gap-2 flex-wrap">
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
										{v} <X />
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
