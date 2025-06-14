import NovelList, { Loading } from "@/components/search/novel-list";
import SidebarSearch from "@/components/search/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

type NewType = {
	title: string;
	page: string;
};

const page = async ({ searchParams }: { searchParams: Promise<NewType> }) => {
	const title = (await searchParams).title;

	return (
		<div className="flex space-x-4 size-full">
			<div className="space-y-2 w-1/4 ">
				<ScrollArea className="h-full pr-4">
					<SidebarSearch />
				</ScrollArea>
			</div>
			<div className="flex-1 space-y-4 flex flex-col">
				<h1 className="text-3xl font-semibold">
					Novel {title && <>&quot;{title}&quot;</>}
				</h1>
				<ScrollArea className="h-full pb-8">
					<Suspense fallback={<Loading />}>
						<NovelList params={searchParams} />
					</Suspense>
				</ScrollArea>
			</div>
		</div>
	);
};

export default page;
