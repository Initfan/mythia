import { novel_review } from "@/generated";
import { Dot, Star } from "lucide-react";
import React from "react";

const Rating = ({ novelReview }: { novelReview: novel_review[] }) => {
	const rating = novelReview.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = rating / novelReview.length || 0;

	return (
		<div className="space-y-2">
			<div className="space-x-4 flex items-center">
				<h1 className="text-4xl">{averageRating.toFixed(1)}</h1>
				{Array.from({ length: 5 }).map((_, idx) => {
					const fullStar = idx + 1 <= Math.floor(averageRating);
					const halfStar =
						!fullStar &&
						idx + 1 === Math.ceil(averageRating) &&
						averageRating % 1 >= 0.5;
					return (
						<Star
							key={idx}
							className={`mr-2 ${
								fullStar || halfStar ? "stroke-0" : "stroke-1"
							}`}
							fill={
								fullStar
									? "yellow"
									: halfStar
									? "url(#half-gradient)"
									: "none"
							}
							style={
								halfStar
									? { clipPath: "inset(0 50% 0 0)" }
									: undefined
							}
						>
							{halfStar && (
								<defs>
									<linearGradient id="half-gradient">
										<stop offset="50%" stopColor="yellow" />
										<stop offset="50%" stopColor="none" />
									</linearGradient>
								</defs>
							)}
						</Star>
					);
				})}
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
