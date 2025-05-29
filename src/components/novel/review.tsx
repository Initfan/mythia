import React from "react";
import { novel_review } from "@/generated/prisma";
import ReviewCard from "./review-card";
import { Button } from "../ui/button";

const ReviewSection = ({ review }: { review: novel_review[] }) => {
	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Reviews</h2>
				<Button>Tulis review</Button>
			</div>
			{review.length == 0 && (
				<p className="text-muted-foreground">
					Belum ada review untuk novel ini. Ayo jadi yang pertama
					memberikan review!
				</p>
			)}
			{review.length > 0 &&
				review.map((value) => <ReviewCard key={value.id} />)}
		</div>
	);
};

export default ReviewSection;
