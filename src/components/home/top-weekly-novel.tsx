"use server";
import prisma from "@/lib/prisma";
import CardNovel from "./card-novel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const TopWeeklyNovel = async () => {
	const novel = await prisma.novel.findMany({
		take: 10,
		include: {
			chapter: true,
			author: { select: { pen_name: true, image: true } },
		},
	});

	return (
		<div className="my-6 space-y-4">
			<h1 className="text-3xl font-semibold">Teratas Mingguan</h1>
			<Carousel opts={{ align: "start" }}>
				<CarouselContent className="cursor-grabbing select-none pl-3">
					{novel.map((v) => (
						<CarouselItem
							key={v.id}
							className="md:basis-1/2 w-full md:w-1/2 -ml-3"
						>
							<CardNovel v={v} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default TopWeeklyNovel;
