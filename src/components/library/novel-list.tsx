"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardNovel, { LoadingCardNovel } from "../home/card-novel";
import { useEffect, useState, useTransition } from "react";
import { Prisma } from "@/generated";
import { getNovelsId } from "@/actions/novel-action";

type novels = Prisma.novelGetPayload<{ include: { chapter: true } }>;

const NovelList = ({ novelsId }: { novelsId: number[] }) => {
	const [novels, setNovels] = useState<novels[]>([]);
	const [pending, transtiion] = useTransition();

	useEffect(() => {
		transtiion(async () => {
			const data = await getNovelsId(novelsId);
			setNovels(data);
		});
	}, [novelsId]);

	return (
		<Carousel>
			<CarouselContent>
				{pending &&
					Array.from({ length: 5 }).map((_, i) => (
						<CarouselItem
							key={i}
							className="lg:basis-1/3 md:basis-1/2 w-full lg:w-1/3 md:w-1/2"
						>
							<LoadingCardNovel key={i} />
						</CarouselItem>
					))}
				{novels.length > 0 &&
					novels.map((v) => (
						<CarouselItem
							key={v.id}
							className="lg:basis-1/3 md:basis-1/2 w-full lg:w-1/3 md:w-1/2"
						>
							<CardNovel v={v} />
						</CarouselItem>
					))}
			</CarouselContent>
		</Carousel>
	);
};

export default NovelList;
