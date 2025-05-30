import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

const ChapterList = async ({ novelId }: { novelId: number }) => {
	const chapters = await prisma.novel_chapter.findMany({
		where: { novelId },
		include: { novel: { select: { title: true } } },
	});

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
					{chapters.map((chapter, i) => (
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
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChapterList;
