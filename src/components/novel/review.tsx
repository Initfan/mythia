"use client";
import { useContext, useState } from "react";
import { Prisma } from "@/generated";
import ReviewCard from "./review-card";
import CreateReview from "./review-create";
import { userContext } from "@/context/user-context";

type userReview = Prisma.novel_reviewGetPayload<{
	include: { user: true };
}>;

const ReviewSection = ({
	review,
	novelId,
	reviewedBy,
}: {
	review: userReview[];
	novelId: number;
	reviewedBy: number[];
}) => {
	const user = useContext(userContext);
	const [novelReview, setNovelReview] = useState<userReview[]>(review);

	const handleAddedReview = (newReview: userReview) =>
		setNovelReview((prev) => [newReview, ...prev]);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Ulasan</h2>
				{user && !reviewedBy.includes(user.id) && (
					<CreateReview
						novelId={novelId}
						addedReview={handleAddedReview}
					/>
				)}
			</div>
			{novelReview.length == 0 && (
				<p className="text-muted-foreground">
					Belum ada review untuk novel ini. Ayo jadi yang pertama
					memberikan review!
				</p>
			)}
			{novelReview.length > 0 &&
				novelReview.map((value) => (
					<ReviewCard key={value.id} review={value} />
				))}
		</div>
	);
};

export default ReviewSection;
