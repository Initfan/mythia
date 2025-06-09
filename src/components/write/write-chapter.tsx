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

type novelChapter = Prisma.novelGetPayload<{
	include: { chapter: true; _count: true };
}>;

const WriteChapter = ({
	novelId,
	activePage,
}: {
	activePage: (id: number) => void;
	novelId: number | null;
}) => {
	const [pending, transition] = useTransition();
	const [novel, setNovel] = useState<novelChapter>();
	const [editorContent, setContent] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!novelId) return activePage(2);
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
		});

		if (chapter.error || !chapter.data) {
			toast("Gagal menyimpan chapter novel");
			return;
		}

		toast("Berhasil menyimpan chapter novel");
		setTimeout(() => {
			return redirect("/dashboard/novel");
		}, 2000);
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
			<Button
				onClick={() => transition(async () => await saveChapter())}
				disabled={pending}
			>
				{pending && <Loader2 className="animate-spin" />}
				Save
			</Button>
		</main>
	);
};

export default WriteChapter;
