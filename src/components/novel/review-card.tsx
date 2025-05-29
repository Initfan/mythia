import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";

const ReviewCard = () => {
	return (
		<div className="flex space-x-6 items-start">
			<Avatar>
				<AvatarImage src="./mythia-logo.png" />
				<AvatarFallback>P</AvatarFallback>
			</Avatar>
			<div className="flex flex-1">
				<div className="flex flex-col space-y-2 flex-1">
					<div className="flex space-x-4 items-center">
						<p className="text-lg font-semibold">Penulis</p>
						{Array.from([1, 2, 3, 4, 5]).map((v) => (
							<Star
								key={v}
								className="stroke-0 mr-2"
								fill="yellow"
								size={15}
							/>
						))}
					</div>
					<p>
						&quot;Novel ini sangat menarik dan penuh dengan
						kejutan!&quot;
					</p>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<Button variant="ghost">
					<ThumbsUp />
				</Button>
				<p className="text-muted-foreground">1</p>
			</div>
		</div>
	);
};

export default ReviewCard;
