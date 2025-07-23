import CardNovel, { LoadingCardNovel } from "../home/card-novel";

import { searchNovel } from "@/actions/novel-action";
import { CircleAlert } from "lucide-react";
import { SearchPagination } from "./pagination";

type NewType = {
	title: string;
	page?: string;
	filter?: string;
	value?: string;
};

const NovelList = async ({ params }: { params: Promise<NewType> }) => {
	const param = await params;
	const title = param.title;
	const page = param.page || "1";
	const filter = param.filter;
	const value = param.value;

	const data = await searchNovel(title, page, filter, value);

	if (data.total == 0)
		return (
			<div className="text-sm flex space-x-2 text-destructive">
				<CircleAlert size={20} />
				<p>Novel tidak ditemukan</p>
			</div>
		);

	return (
		<div className="pb-8 space-y-6">
			<div className="grid lg:grid-cols-2 gap-4">
				{data.novel.map((v, i) => (
					<CardNovel key={i} v={v} />
				))}
			</div>
			<SearchPagination
				title={title}
				page={page}
				pageSize={Math.ceil(data.total / 10)}
			/>
		</div>
	);
};

export const Loading = () => {
	return (
		<div className="grid lg:grid-cols-2 gap-4">
			{Array.from({ length: 10 }).map((_, i) => (
				<LoadingCardNovel key={i} />
			))}
		</div>
	);
};

export default NovelList;
