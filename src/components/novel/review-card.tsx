"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Prisma } from "@/generated";
import { useContext, useEffect, useState, useTransition } from "react";
import { likeReview, unlikeReview } from "@/actions/review-action";
import { userContext } from "@/context/user-context";

type userReview = Prisma.novel_reviewGetPayload<{
	include: { user: true };
}>;

const ReviewCard = ({ review }: { review: userReview }) => {
	const user = useContext(userContext);
	const [likes, setLikes] = useState(review.likes);
	const [liked, setLiked] = useState<boolean>();

	const [pending, transition] = useTransition();

	useEffect(() => {
		if (user) setLiked(review.liked_by.includes(user.id));
	}, [review.liked_by, user]);

	const likeHandler = () => {
		transition(async () => {
			const liked = await likeReview(review.id);

			if (liked) {
				setLiked(true);
				setLikes((p) => p + 1);
			}
		});
	};

	const unlikeHandler = () => {
		transition(async () => {
			const liked = await unlikeReview(review.id);

			if (liked) {
				setLiked(false);
				setLikes((p) => p - 1);
			}
		});
	};

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
			{user && (
				<div className="flex flex-col items-center">
					<Button
						variant="ghost"
						onClick={liked ? unlikeHandler : likeHandler}
						disabled={pending}
					>
						<ThumbsUp
							fill={liked ? "white" : "none"}
							stroke={liked ? "none" : "white"}
						/>
					</Button>
					<p className="text-muted-foreground">{likes}</p>
				</div>
			)}
		</div>
	);
};

export default ReviewCard;
