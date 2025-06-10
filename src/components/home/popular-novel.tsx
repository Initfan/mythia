import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardNovel from "./card-novel";
import prisma from "@/lib/prisma";

const PopularNovel = async () => {
	const novel = await prisma.novel.findMany({
		orderBy: { views: "desc" },
		include: { chapter: true },
		take: 10,
	});
	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-semibold">Terpopuler</h1>
			<Carousel opts={{ align: "start" }}>
				<CarouselContent className="cursor-grabbing select-none">
					{novel.map((v) => (
						<CarouselItem
							key={v.id}
							className="lg:basis-1/3 md:basis-1/2 w-full lg:w-1/3 md:w-1/2 pl-4 -mr-4"
						>
							<CardNovel v={v} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default PopularNovel;
