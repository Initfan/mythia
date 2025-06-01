import { Dot } from "lucide-react";
import Cover from "../cover";
import { Prisma } from "@prisma/client";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

type NovelChapter = Prisma.novelGetPayload<{ include: { chapter: true } }>;

const CardNovel = ({ v }: { v: NovelChapter }) => {
	return (
		<>
			<Cover src={v.cover} alt={v.title} />
			<div className="space-y-3 flex-1 flex justify-between flex-col">
				<h3 className="text-2xl font-medium group-hover:underline line-clamp-2">
					{v.title}
				</h3>
				<p className="text-sm flex">
					<Badge>{v.genre}</Badge>{" "}
					<span className="flex space-x-4">
						<Dot /> On going
					</span>
				</p>
				<p className="text-muted-foreground line-clamp-3">
					{v.synopsis}
				</p>
				<p className="text-sm flex">
					{v.views} Dilihat
					<Dot />
					{v.chapter.length} Bab
				</p>
			</div>
		</>
	);
};

export const LoadingCardNovel = () => {
	return <Skeleton className="h-[230px] w-full" />;
};

export default CardNovel;
