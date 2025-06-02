import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardNovel from "./card-novel";
import { Prisma } from "@prisma/client";

type NovelChapter = Prisma.novelGetPayload<{ include: { chapter: true } }>;

const NewestNovel = ({ novel }: { novel: NovelChapter[] }) => {
	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-semibold">Terbaru</h1>
			<Carousel>
				<CarouselContent>
					{novel.map((v) => (
						<CarouselItem
							key={v.id}
							className="lg:basis-1/3 md:basis-1/2 w-full lg:w-1/3 md:w-1/2"
						>
							<Link
								href={`/novel/${v.title.replaceAll(" ", "-")}`}
								className="flex h-[230px] space-x-4 hover:cursor-pointer group"
							>
								<CardNovel v={v} />
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default NewestNovel;
