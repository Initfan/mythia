import PopularNovelGenre from "@/components/home/popular-novel-genre";
import React, { Suspense } from "react";
import NewestNovel from "@/components/home/newest-novel";
import EventNovel from "@/components/home/event-novel";
import PopularNovel from "@/components/home/popular-novel";
import TopWeeklyNovel from "@/components/home/top-weekly-novel";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/home/footer";
import Loading, { WeeklyLoading } from "@/components/home/loading";

const page = async () => {
	return (
		<>
			<Navigation />
			<main className="w-[90vw] mx-auto">
				<div className="space-y-4 pb-12">
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
