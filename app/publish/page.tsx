import { FileUploadDemo } from "@/components/publish/file-upload-demo";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import React from "react";

const page = () => {
	return (
		<>
			<Navigation noLink>
				<div className="space-x-2">
					<Button variant={"outline"}>Save</Button>
					<Button>Next</Button>
				</div>
			</Navigation>
			<main className="w-[90%] mx-auto pt-24">
				<h1 className="text-2xl font-semi">Buat cerita novel</h1>
				<section className="my-4">
					<div className="h-96 w-1/5">
						<FileUploadDemo />
					</div>
				</section>
			</main>
		</>
	);
};

export default page;
