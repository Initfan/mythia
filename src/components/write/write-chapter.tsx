"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import Editor from "./editor";
import { Loader2 } from "lucide-react";
import { createChapter, getNovelId } from "@/actions/novel-action";
import { Prisma } from "@/generated";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

type novelChapter = Prisma.novelGetPayload<{
	include: { chapter: true; _count: true };
}>;

const WriteChapter = ({
	novelId,
	activePage,
}: {
	activePage?: (id: number) => void;
	novelId: number | null;
}) => {
	const [paid, setPaid] = useState<boolean>(false);
	const [pending, transition] = useTransition();
	const [novel, setNovel] = useState<novelChapter>();
	const [editorContent, setContent] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);
	const coinRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!novelId) return activePage!(2);
		transition(
			async () => await getNovelId(novelId).then((res) => setNovel(res!))
		);
	}, [novelId, activePage]);

	const saveChapter = async () => {
		if (titleRef.current?.value.length == 0) {
			toast("Masukan judul chapter");
			return;
		}

		const chapter = await createChapter({
			title: titleRef.current!.value,
			content: editorContent,
			novelId: novelId!,
			isPaid: paid,
			paidAmount: Number(coinRef.current?.value ?? 0),
		});

		console.log(chapter);

		if (chapter.error || !chapter.data) {
			toast("Gagal menyimpan chapter novel");
			return;
		}

		toast("Berhasil menyimpan chapter novel");
		return redirect("/dashboard/novel");
	};

	return (
		<main className="flex flex-col w-full space-y-8 pb-4">
			{pending ? (
				<Skeleton className="h-6" />
			) : (
				<h1 className="text-2xl font-semibold">
					{novel?.title} - Bab {(novel?._count.chapter ?? 0) + 1}
				</h1>
			)}
			<input
				placeholder="Masuk Judul Bab"
				className="text-3xl bg-transpate hover:outline-none focus:outline-none"
				ref={titleRef}
			/>
			<div className="min-h-[300px] flex">
				<Editor setContent={(e) => setContent(e)} />
			</div>
			<div className="space-y-2">
				<div className="flex space-x-2 items-center">
					<Checkbox
						id="paid"
						onCheckedChange={(e) => setPaid(e ? true : false)}
					/>{" "}
					<label htmlFor="paid">Chapter berbayar</label>
				</div>
				{paid && (
					<Input
						type="number"
						placeholder="Jumlah koin untuk membaca chapter"
						ref={coinRef}
						required
					/>
				)}
			</div>
			<Button
				onClick={() => transition(async () => await saveChapter())}
				disabled={pending}
			>
				{pending && <Loader2 className="animate-spin" />}
				Simpan
			</Button>
		</main>
	);
};

export default WriteChapter;
