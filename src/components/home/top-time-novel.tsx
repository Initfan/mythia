"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card } from "../ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const TIME = ["Harian", "Mingguan", "Bulanan"];

const TopTimeNovel = () => {
	const [currentCarousel, setCurrentCarousel] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentCarousel((prev) => (prev % TIME.length) + 1);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="py-5">
			<h1 className="text-4xl font-bold text-center pb-6">
				Teratas {TIME[currentCarousel - 1]}
			</h1>
			<Carousel
				className="flex items-center relative gap-6"
				plugins={[Autoplay({ delay: 5000 })]}
			>
				<div className="flex-1 mx-auto">
					<CarouselContent className="-ml-8">
						{TIME.map((_, i) => (
							<CarouselItem key={i} className="pl-8">
								<div className="flex space-x-4">
									{Array.from({ length: 5 }).map((v, i) => (
										<Card
											key={i}
											className={`md:w-1/3 md:basis-1/3 w-full h-[250px] ${
												i === 2
													? "scale-105 mt-2"
													: i % 2
													? "mt-6"
													: "mt-10"
											}`}
										></Card>
									))}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</div>
			</Carousel>
		</div>
	);
};

export default TopTimeNovel;
