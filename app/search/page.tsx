import NovelList, { Loading } from "@/components/search/novel-list";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

const sorts = ["Terbaru", "Terlaris", "Teratas", "Rating"];

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{ title: string }>;
}) => {
	const title = (await searchParams).title;

	return (
		<div className="flex space-x-4 size-full">
			<div className="space-y-2 w-1/4 ">
				<h2 className="text-2xl font-semibold">Urutkan</h2>
				<div className="space-y-1">
					{sorts.map((sort, i) => (
						<p key={i}>
							<Checkbox /> {sort}
						</p>
					))}
				</div>
			</div>
			<div className="flex-1 space-y-4 flex flex-col">
				<h1 className="text-3xl font-semibold">
					Novel &quot;{title}&quot;
				</h1>
				<ScrollArea className="h-full">
					<Suspense fallback={<Loading />}>
						<NovelList params={searchParams} />
					</Suspense>
				</ScrollArea>
			</div>
		</div>
	);
};

export default page;
