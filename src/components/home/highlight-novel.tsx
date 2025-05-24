import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export function HighlighNovel() {
	return (
		<Carousel className="w-full h-96">
			<CarouselContent className="h-96">
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="h-full">
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<span className="text-4xl font-semibold">
										{index + 1}
									</span>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
