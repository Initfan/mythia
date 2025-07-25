"use client";
import {
	useActionState,
	useContext,
	useEffect,
	useState,
	useTransition,
} from "react";
import { Button } from "../ui/button";
import { likeNovel, unlikeNovel } from "@/actions/novel-action";
import { userContext } from "@/context/user-context";
import { Loader2, ThumbsUp } from "lucide-react";

const ButtonLike = ({
	novelId,
	likedBy,
}: {
	novelId: number;
	likedBy: number[];
}) => {
	const user = useContext(userContext);
	const [pending, startTransition] = useTransition();
	const [liked, setLike] = useState<boolean>();

	const [state, action, isPending] = useActionState(
		() =>
			!user
				? null
				: liked
				? unlikeNovel(novelId, user!.id)
				: likeNovel(novelId, user.id),
		{ message: "", novel: "", liked: likedBy.includes(user?.id ?? 0) }
	);

	useEffect(() => {
		if (user) {
			setLike(likedBy.includes(user.id));
			// action(() => liked ? unlikeNovel(novelId, user.id) : likeNovel())
		}
		// setLike(state.liked!);
	}, [likedBy, user]);

	if (!user) return;

	return (
		<Button
			variant="secondary"
			title={`${liked ? "Hapus dari" : "Tambahkan ke"} Favorit`}
			onClick={() => startTransition(async () => action())}
			disabled={pending || isPending}
		>
			{pending || isPending ? (
				<Loader2 className="animate-spin" />
			) : (
				<ThumbsUp
					fill={liked ? "red" : undefined}
					stroke={liked ? "none" : "white"}
				/>
			)}
		</Button>
	);
};

export default ButtonLike;
