import CardNovel, { LoadingCardNovel } from "../home/card-novel";

import { searchNovel } from "@/actions/novel-action";
import { CircleAlert } from "lucide-react";

const NovelList = async ({
	params,
}: {
	params: Promise<{ title: string }>;
}) => {
	const title = (await params).title;

	const novel = await searchNovel(title);

	if (novel.length == 0)
		return (
			<div className="text-sm flex space-x-2 text-destructive">
				<CircleAlert size={20} />
				<p>Novel tidak ditemukan</p>
			</div>
		);

	return (
		<div className="grid grid-cols-2 gap-4">
			{novel.map((v, i) => (
				<CardNovel key={i} v={v} />
			))}
		</div>
	);
};

export const Loading = () => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{Array.from({ length: 10 }).map((_, i) => (
				<LoadingCardNovel key={i} />
			))}
		</div>
	);
};

export default NovelList;
