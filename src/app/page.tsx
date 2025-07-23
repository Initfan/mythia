import PopularNovelGenre from "@/components/home/popular-novel-genre";
import React, { Suspense } from "react";
import NewestNovel from "@/components/home/newest-novel";
import EventNovel from "@/components/home/event-novel";
import PopularNovel from "@/components/home/popular-novel";
import TopWeeklyNovel from "@/components/home/top-weekly-novel";
import Footer from "@/components/home/footer";
import Loading, { WeeklyLoading } from "@/components/home/loading";
import Navigation from "@/components/ui/navigation";
import Image from "next/image";
import SearchNovel from "@/components/search-novel";

const page = async () => {
	return (
		<>
			<Navigation />
			<main className="w-[90vw] mx-auto">
				<div className="space-y-4 pb-12">
					<section className="md:hidden flex gap-4 mb-0 w-full py-3 items-center">
						<Image
							src="/mythia-logo.png"
							alt="mythia logo"
							width={50}
							height={50}
						/>
						<SearchNovel />
					</section>
					<EventNovel />
					<Suspense fallback={<Loading />}>
						<PopularNovel />
					</Suspense>
					<Suspense fallback={<WeeklyLoading />}>
						<TopWeeklyNovel />
					</Suspense>
					<Suspense fallback={<Loading />}>
						<NewestNovel />
					</Suspense>
					<PopularNovelGenre />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default page;
