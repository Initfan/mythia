import { novel_review } from "@/generated/prisma";
import { Dot, Star } from "lucide-react";
import React from "react";

const Rating = ({ novelReview }: { novelReview: novel_review[] }) => {
	const rating = novelReview.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = rating / novelReview.length || 0;

	return (
		<div className="space-y-2">
			<div className="space-x-4 flex items-center">
				<h1 className="text-4xl">{averageRating}</h1>
				{Array.from({
					length: 5,
				}).map((_, idx) => (
					<Star
						key={idx}
						className={`${
							idx + 1 > averageRating ? "stroke-1" : "stroke-0"
						} mr-2`}
						fill={averageRating > idx ? "yellow" : "none"}
					/>
				))}
			</div>
			<div className="flex space-x-2 text-muted-foreground">
				<p>{novelReview.length} rating</p>
				<Dot />
				<p>{novelReview.length} Ulansan</p>
			</div>
		</div>
	);
};

export default Rating;
