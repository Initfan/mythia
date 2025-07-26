import SearchNovel from "@/components/search-novel";
import NovelList, { Loading } from "@/components/search/novel-list";
import SidebarSearch from "@/components/search/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Suspense } from "react";

type NewType = {
	title: string;
	page: string;
};

const page = async ({ searchParams }: { searchParams: Promise<NewType> }) => {
	const title = (await searchParams).title;

	return (
		<div className="space-y-4 py-5">
			<nav className="md:hidden flex gap-4 mb-0 w-full py-3 items-center">
				<Image
					src="/mythia-logo.png"
					alt="mythia logo"
					width={50}
					height={50}
				/>
				<SearchNovel />
			</nav>
			<div className="flex space-x-4 size-full flex-col md:flex-row ">
				<section className="hidden md:block space-y-2 w-1/4 ">
					<ScrollArea className="h-full pr-4">
						<SidebarSearch />
					</ScrollArea>
				</section>
				<article className="lg:flex-1 space-y-4 flex flex-col">
					<h1 className="text-3xl font-semibold">
						Novel {title && <>&quot;{title}&quot;</>}
					</h1>

					<ScrollArea className="h-full pb-8">
						<Suspense fallback={<Loading />}>
							<NovelList params={searchParams} />
						</Suspense>
					</ScrollArea>
				</article>
			</div>
		</div>
	);
};

export default page;
