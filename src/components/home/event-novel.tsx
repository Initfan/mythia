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
import { Dot } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { novel } from "@/generated";
import { highlightNovel } from "@/actions/novel-action";
import { Skeleton } from "../ui/skeleton";

const EventNovel = () => {
	const [pending, transition] = useTransition();
	const [novel, setNovel] = useState<novel[]>();

	useEffect(() => {
		transition(() => highlightNovel().then((res) => setNovel(res)));
	}, []);

	return (
		<div className="h-[450px]">
			{pending && <Skeleton className="size-full" />}
			{!pending && (
				<Carousel
					className="relative w-full group"
					plugins={[Autoplay({ delay: 4000 })]}
				>
					<CarouselPrevious className="hidden group-hover:flex absolute left-14 z-10 bg-primary!" />
					<CarouselContent>
						{!pending &&
							novel &&
							novel.map((v) => (
								<CarouselItem
									className="block h-[450px] relative bg-zinc-800/70 rounded"
									key={v.id}
								>
									<Image
										src={v.cover}
										alt="fantasy images"
										className="flex-1 object-cover rounded mix-blend-multiply"
										fill
									/>
									<div className="absolute w-3/4 mx-auto inset-x-0 bottom-16 space-y-5">
										<h1 className="text-4xl font-semibold">
											{v.title}
										</h1>
										<p className="text-sm flex items-center">
											<Badge>{v.genre}</Badge> <Dot />{" "}
											{v.status}
										</p>
										<div className="text-muted-foreground line-clamp-3 lg:w-1/2">
											{v.synopsis}
										</div>
										<Link
											href={`/novel/${v.title.replaceAll(
												" ",
												"-"
											)}`}
										>
											<Button>Baca Novel</Button>
										</Link>
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselNext className="hidden group-hover:flex absolute right-14 z-10 bg-primary!" />
				</Carousel>
			)}
		</div>
	);
};

export default EventNovel;
