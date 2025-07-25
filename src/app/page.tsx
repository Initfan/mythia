import PopularNovelGenre from "@/components/home/popular-novel-genre";
import React, { Suspense } from "react";
import EventNovel from "@/components/home/event-novel";
import PopularNovel from "@/components/home/popular-novel";
import Loading from "@/components/home/loading";
import Navigation from "@/components/ui/navigation";

const page = async () => {
	return (
		<>
			<Navigation />
			<section className="space-y-4 pb-12">
				<EventNovel />
				<Suspense fallback={<Loading />}>
					<PopularNovel />
				</Suspense>
				<PopularNovelGenre />
			</section>
			{/* <Footer /> */}
		</>
	);
};

export default page;
