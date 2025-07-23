/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { getHistoryRead } from "@/actions/novel-action";
import Cover from "@/components/cover";
import { LoadingCardNovel } from "@/components/home/card-novel";
import { userContext } from "@/context/user-context";
import { Prisma } from "@/generated";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
import parser from "html-react-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type historiesType = Prisma.novel_historyGetPayload<{
	include: { novel: true; novel_chapter: true };
}>;

const page = () => {
	const user = useContext(userContext);
	const router = useRouter();
	const [histories, setHistories] = useState<historiesType[]>();
	const [pending, transition] = useTransition();

	useEffect(() => {
		if (user)
			transition(async () => {
				const history = await getHistoryRead(user!.id);
				setHistories(history);
			});
	}, [user]);

	return (
		<main className="space-y-4 py-5">
			<h1 className="text-3xl font-semibold">Riwayat baca</h1>
			{pending && (
				<div className="gap-4 grid grid-cols-3">
					{Array.from({ length: 2 }).map((_, i) => (
						<LoadingCardNovel key={i} />
					))}
				</div>
			)}
			{!pending && !histories && (
				<p className="text-muted-foreground">Tidak ada riwayat</p>
			)}
			{!pending && histories && (
				<div className="gap-3 grid md:grid-cols-3">
					{histories.map((v) => (
						<div
							key={v.id}
							className="flex h-[230px] space-x-4 hover:cursor-pointer group"
							onClick={() =>
								router.push(
									`/novel/${v.novel.title.replaceAll(
										" ",
										"-"
									)}`
								)
							}
						>
							<Cover src={v.novel.cover} alt={v.novel.title} />
							<div className="space-y-3 flex-1 flex justify-between flex-col">
								<h3 className="text-2xl font-medium group-hover:underline line-clamp-2">
									{v.novel.title}
								</h3>
								<p className="text-sm flex items-center">
									Bab {v.novel_chapter.chapter} -{" "}
									{v.novel_chapter.title}
								</p>
								<div className="text-muted-foreground w-[90%] line-clamp-3">
									{parser(v.novel.synopsis)}
								</div>
								<Button>
									<Link
										href={`/novel/${v.novel.title.replaceAll(
											" ",
											"-"
										)}/chapter/${v.novelChapterId}`}
									>
										Lanjut baca
									</Link>
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</main>
	);
};

export default page;
