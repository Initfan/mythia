"use client";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@prisma/client";
import CardNovel, { LoadingCardNovel } from "./card-novel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { getAllGenre, novelByGenre } from "@/actions/novel-action";
import { Button } from "../ui/button";
import { genre } from "@/generated";
import { Skeleton } from "../ui/skeleton";

type NovelChapter = Prisma.novelGetPayload<{
	include: {
		chapter: true;
		author: { select: { pen_name: true } };
	};
}>;

const PopularNovelGenre = () => {
	const [selectedGenre, setSelectedGenre] = useState("Fantasi");
	const [genre, setGenre] = useState<genre[]>([]);
	const [novel, setNovel] = useState<NovelChapter[]>([]);
	const [isPending, startTransition] = useTransition();
	const [genrePending, transition] = useTransition();

	useEffect(() => {
		transition(() => getAllGenre().then((res) => setGenre(res)));
	}, []);

	useEffect(() => {
		setNovel([]);
		startTransition(async () => {
			const res = await novelByGenre(selectedGenre);
			setNovel(res);
		});
	}, [selectedGenre]);

	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-semibold">Teratas di Genre</h1>
			<div className="flex space-x-2">
				{genrePending ? (
					<div className="flex-1 grid grid-cols-3 gap-2">
						{Array.from({ length: 7 }).map((v, i) => (
							<Skeleton key={i} className="" />
						))}
					</div>
				) : (
					<div className="flex-1 gap-2 flex flex-wrap">
						{genre.map((v) => (
							<Button
								key={v.id}
								variant={
									selectedGenre == v.genre
										? "default"
										: "outline"
								}
								onClick={() => setSelectedGenre(v.genre)}
								disabled={isPending}
							>
								{v.genre}
							</Button>
						))}
					</div>
				)}

				<div className="w-2/3">
					{!isPending && novel.length === 0 ? (
						<p className="text-muted-foreground">
							Novel bergenre {selectedGenre} tidak ada.
						</p>
					) : novel.length > 0 ? (
						<Carousel opts={{ align: "start" }}>
							<CarouselContent className="cursor-grabbing select-none">
								{novel.map((v) => (
									<CarouselItem
										key={v.id}
										className="lg:basis-1/2 basis-1 lg:w-1/2 w-full pl-4 -mr-4"
									>
										<CardNovel v={v} />
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					) : (
						<div className="grid grid-cols-2 gap-4">
							<LoadingCardNovel />
							<LoadingCardNovel />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PopularNovelGenre;
