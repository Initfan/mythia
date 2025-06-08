"use client";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const EventNovel = () => {
	return (
		<div className="h-[350px]">
			<Carousel
				className="absolute inset-x-0 w-full group"
				plugins={[Autoplay({ delay: 5000 })]}
			>
				<CarouselPrevious className="hidden group-hover:flex absolute left-14 z-10 bg-primary!" />
				<CarouselContent>
					<CarouselItem className="block h-[350px] relative">
						<Image
							src="/event.jpg"
							alt="event novel promo"
							className="size-full object-cover rounded"
							fill
						/>
					</CarouselItem>
					<CarouselItem className="block h-[350px] relative">
						<Image
							src="/event-world-book-day.jpg"
							alt="event world book day"
							className="size-full object-cover rounded"
							fill
						/>
					</CarouselItem>
				</CarouselContent>
				<CarouselNext className="hidden group-hover:flex absolute right-14 z-10 bg-primary!" />
			</Carousel>
		</div>
	);
};

export default EventNovel;
