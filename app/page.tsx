import { HighlighNovel } from "@/components/home/highlight-novel";
import PopularNovel from "@/components/home/popular-novel";
import Navigation from "@/components/ui/navigation";
import React from "react";

const page = () => {
	return (
		<>
			<Navigation />
			<main className="pt-24 space-y-4 w-[90%] mx-auto">
				<HighlighNovel />
				<section className="pb-12">
					<PopularNovel />
				</section>
			</main>
		</>
	);
};

export default page;
