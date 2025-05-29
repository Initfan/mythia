import { HighlighNovel } from "@/components/home/highlight-novel";
import PopularNovel from "@/components/home/popular-novel";
import React from "react";

const page = () => {
	return (
		<main className="space-y-4">
			<HighlighNovel />
			<section className="pb-12">
				<PopularNovel />
			</section>
		</main>
	);
};

export default page;
