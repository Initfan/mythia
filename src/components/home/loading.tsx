import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import { LoadingCardNovel } from "./card-novel";

const Loading = () => {
	return (
		<div className="space-y-4">
			<Skeleton className="h-6 w-1/3" />
			<Carousel opts={{ align: "start" }}>
				<CarouselContent className="cursor-grabbing select-none">
					{Array.from({ length: 4 }).map((v, i) => (
						<CarouselItem
							key={i}
							className="lg:basis-1/3 md:basis-1/2 w-full lg:w-1/3 md:w-1/2 pl-4"
						>
							<LoadingCardNovel />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default Loading;
