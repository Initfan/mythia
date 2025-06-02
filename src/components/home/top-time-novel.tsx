"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import Cover from "../cover";
import { Award } from "lucide-react";
import { useRouter } from "next/navigation";

const TIME = ["Harian", "Mingguan", "Bulanan"];

type NovelChapter = Prisma.novelGetPayload<{
	include: {
		chapter: true;
		author: { select: { pen_name: true } };
	};
}>;

const TopTimeNovel = ({ novel }: { novel: NovelChapter[] }) => {
	const router = useRouter();
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
				plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
			>
				<div className="flex-1 mx-auto">
					<CarouselContent className="-ml-8">
						{TIME.map((_, i) => (
							<CarouselItem key={i} className="pl-8">
								<div className="flex space-x-4">
									{Array.from({ length: 5 }).map((v, i) => (
										<Cover
											key={i}
											onClick={() =>
												router.push(
													`/novel/${novel[
														i
													].title.replaceAll(
														" ",
														"-"
													)}`
												)
											}
											className={`md:w-1/3 md:basis-1/3 w-full h-[250px] relative cursor-pointer ${
												i === 2
													? "scale-105 mt-2"
													: i % 2
													? "mt-6"
													: "mt-10"
											}`}
											src={novel[i].cover}
											alt={novel[i].title}
										>
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-transparent h-16 flex items-center justify-center">
												<p className="text-sm font-semibold">
													{novel[i].title}
												</p>
											</div>
											{i === 2 ? (
												<Award
													className="absolute top-2 right-2 text-yellow-400"
													size={40}
												/>
											) : i == 1 ? (
												<Award
													className="absolute top-2 right-2 text-gray-300"
													size={35}
												/>
											) : i == 3 ? (
												<Award
													className="absolute top-2 right-2 text-amber-900"
													size={35}
												/>
											) : null}
										</Cover>
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
