import ClientEditor from "@/components/publish/client-editor";
import { FileUploadThing } from "@/components/publish/file-upload";
import SelectGenre from "@/components/publish/select-genre";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/ui/navigation";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const page = () => {
	return (
		<>
			<Navigation noLink>
				<div className="space-x-2">
					<Button variant={"outline"}>Save</Button>
					<Button>Publish</Button>
				</div>
			</Navigation>
			<main className="w-[90%] mx-auto pt-24 h-[90vh] overflow-hidden">
				<section className="flex space-x-4 h-full">
					<div className="w-1/5 h-full space-y-4 flex flex-col">
						<h1 className="text-2xl font-semibold">Cover novel</h1>
						<div className="flex-1">
							<FileUploadThing />
							{/* <Home /> */}
						</div>
					</div>
					<div className="w-1/3 space-y-4">
						<h1 className="text-2xl font-semibold">
							Detail cerita
						</h1>
						<div className="space-y-2">
							<Label htmlFor="title">Judul</Label>
							<Input id="title" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="title">Sinopsis</Label>
							<Textarea />
						</div>
						<div className="space-y-2">
							<Label htmlFor="title">Genre</Label>
							<SelectGenre />
						</div>
					</div>
					<div className="flex-1 flex flex-col space-y-4 mx-6 h-full">
						<h1 className="text-2xl font-semibold">Tulis cerita</h1>
						<input
							type="text"
							placeholder="Masukan judul chapter"
							className="focus:outline-none text-3xl pb-4"
						/>
						<ClientEditor />
					</div>
				</section>
			</main>
		</>
	);
};

export default page;
