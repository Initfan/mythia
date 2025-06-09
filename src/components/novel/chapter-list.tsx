"use client";
import { useEffect, useState, useTransition } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { getChapterList } from "@/actions/novel-action";
import { Prisma } from "@/generated";
import { Skeleton } from "../ui/skeleton";

type novelChapter = Prisma.novel_chapterGetPayload<{
	include: { novel: { select: { title: true } } };
}>;

const ChapterList = ({ novelId }: { novelId: number }) => {
	const [chapters, setChapters] = useState<novelChapter[]>([]);
	const [pending, transition] = useTransition();

	useEffect(() => {
		transition(async () => {
			const data = await getChapterList(novelId);
			setChapters(data);
		});
	}, [novelId]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Daftar Bab</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Daftar Bab</DialogTitle>
				</DialogHeader>
				<div className="space-y-2">
					{pending ? (
						<Skeleton className="h-6" />
					) : (
						chapters.map((chapter, i) => (
							<Link
								key={i}
								href={`/novel/${chapter.novel.title.replaceAll(
									" ",
									"-"
								)}/chapter/${chapter.chapter}`}
							>
								<Button
									variant="ghost"
									className="w-full justify-start"
								>
									Bab {chapter.chapter} - {chapter.title}
									<span className="text-xs text-muted-foreground ml-auto">
										{new Date(
											chapter.createdAt
										).toLocaleDateString("id-ID", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</Button>
							</Link>
						))
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChapterList;
