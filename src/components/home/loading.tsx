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

export const WeeklyLoading = () => {
	return (
		<div className="my-6 space-y-4">
			<Skeleton className="h-6 w-1/3 mx-auto" />
			<div className="flex space-x-4">
				{Array.from({ length: 5 }).map((v, i) => (
					<Skeleton
						key={i}
						className={`md:w-1/3 md:basis-1/3 w-full h-[250px] relative cursor-pointer ${
							i === 2
								? "scale-105 mt-2"
								: i % 2
								? "mt-6"
								: "mt-10"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Loading;
