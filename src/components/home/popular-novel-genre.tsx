"use client";
import React, { useEffect, useTransition } from "react";
import { genre, Prisma } from "@prisma/client";
import CardNovel, { LoadingCardNovel } from "./card-novel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { novelByGenre } from "@/actions/novel-action";
import { Button } from "../ui/button";

type NovelChapter = Prisma.novelGetPayload<{
	include: {
		chapter: true;
		author: { select: { pen_name: true } };
	};
}>;

const PopularNovelGenre = ({ genre }: { genre: genre[] }) => {
	const [selectedGenre, setSelectedGenre] = React.useState("Fantasi");
	const [novel, setNovel] = React.useState<NovelChapter[]>([]);
	const [isPending, startTransition] = useTransition();

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
				<div className="flex-1 gap-2 flex flex-wrap">
					{genre.map((v) => (
						<Button
							key={v.id}
							variant={
								selectedGenre == v.genre ? "default" : "outline"
							}
							onClick={() => setSelectedGenre(v.genre)}
							disabled={isPending}
						>
							{v.genre}
						</Button>
					))}
				</div>
				<div className="w-2/3">
					{!isPending && novel.length === 0 ? (
						<p className="text-muted-foreground">
							Novel bergenre {selectedGenre} tidak ada.
						</p>
					) : (
						<Carousel>
							<CarouselContent>
								{novel.map((v) => (
									<CarouselItem
										key={v.id}
										className="lg:basis-1/2 w-full lg:w-1/2"
									>
										<CardNovel v={v} />
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					)}
					{isPending && (
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
