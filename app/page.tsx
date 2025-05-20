import Navigation from "@/components/ui/navigation";
import React from "react";

const page = () => {
	return (
		<>
			<Navigation />
			<main className="pt-24 space-y-4 w-[90%] mx-auto">
				<div className="h-96 rounded p-4 bg-zinc-900/50"></div>
				<section>
					<h1 className="text-3xl font-semibold">Trending</h1>
				</section>
			</main>
		</>
	);
};

export default page;
