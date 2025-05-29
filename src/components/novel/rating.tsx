import { Dot, Star } from "lucide-react";
import React from "react";

const Rating = ({ rating, reviews }: { rating: number; reviews: number }) => {
	return (
		<div className="space-y-2">
			<div className="space-x-4 flex items-center">
				<h1 className="text-4xl">{rating}</h1>
				{Array.from([1, 2, 3, 4, 5]).map((v) => (
					<Star key={v} className="stroke-0 mr-2" fill="yellow" />
				))}
			</div>
			<div className="flex space-x-2 text-muted-foreground">
				<p>{rating} rating</p>
				<Dot />
				<p>{reviews} ulasan</p>
			</div>
		</div>
	);
};

export default Rating;
