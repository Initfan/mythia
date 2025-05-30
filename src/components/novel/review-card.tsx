import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Prisma } from "@/generated/prisma";

type userReview = Prisma.novel_reviewGetPayload<{
	include: { user: true };
}>;

const ReviewCard = ({ review }: { review: userReview }) => {
	return (
		<div className="flex space-x-6 items-start">
			<Avatar>
				<AvatarImage src="./mythia-logo.png" />
				<AvatarFallback>
					{review.user.username.slice(0, 1)}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-1">
				<div className="flex flex-col space-y-2 flex-1">
					<div className="flex space-x-4 items-center">
						<p className="text-lg font-semibold">
							{review.user.username}
						</p>
						{Array.from([1, 2, 3, 4, 5]).map((v, i) => (
							<Star
								key={i}
								className="stroke-0 mr-2"
								fill={v >= review.rating ? "none" : "yellow"}
								size={15}
							/>
						))}
					</div>
					<p>{review.review}</p>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<Button variant="ghost">
					<ThumbsUp />
				</Button>
				<p className="text-muted-foreground">{review.likes}</p>
			</div>
		</div>
	);
};

export default ReviewCard;
