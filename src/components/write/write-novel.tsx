import { FileUploadThing } from "@/components/write/file-upload";
import SelectGenre from "@/components/write/SelectGenre";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WriteNovel = () => {
	return (
		<>
			<div className="space-y-4 flex flex-col">
				<h1 className="text-xl font-semibold">Cover novel</h1>
				<div className="h-[300px] w-[200px]">
					<FileUploadThing />
				</div>
			</div>
			<div className="flex-1 space-y-4">
				<h1 className="text-xl font-semibold">Detail novel</h1>
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
				<div className="space-y-2">
					<Label htmlFor="title">Target Audience</Label>
					<Input id="title" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="title">Content Rating</Label>
					<Input id="title" />
				</div>
			</div>
		</>
	);
};

export default WriteNovel;
