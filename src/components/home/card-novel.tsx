"use client";
import { Dot } from "lucide-react";
import Cover from "../cover";
import { Prisma } from "@prisma/client";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import parser from "html-react-parser";

type NovelChapter = Prisma.novelGetPayload<{
	include: {
		chapter: true;
	};
}>;

const CardNovel = ({ v }: { v: NovelChapter }) => {
	const router = useRouter();

	return (
		<div
			className="flex h-[230px] space-x-4 hover:cursor-pointer group"
			onClick={() =>
				router.push(`/novel/${v.title.replaceAll(" ", "-")}`)
			}
		>
			<Cover src={v.cover} alt={v.title} />
			<div className="space-y-3 flex-1 flex justify-between flex-col">
				<h3 className="text-2xl font-medium group-hover:underline line-clamp-2">
					{v.title}
				</h3>
				<p className="text-sm flex items-center">
					<Badge>{v.genre}</Badge> <Dot /> {v.status}
				</p>
				<div className="text-muted-foreground w-[90%] line-clamp-3">
					{parser(v.synopsis)}
				</div>
				<p className="text-sm flex">
					{v.views} Dilihat
					<Dot />
					{v.chapter.length} Bab
				</p>
			</div>
		</div>
	);
};

export const LoadingCardNovel = () => {
	return <Skeleton className="h-[230px] w-full" />;
};

export default CardNovel;
