import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Editor from "./editor";
import { userContext } from "@/context/user-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const WriteChapter = () => {
	const router = useRouter();
	const user = useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [novelId, setNovelId] = useState<number>();
	const [editorContent, setContent] = useState("");
	const titleRef = useRef<HTMLInputElement>(null);

	const saveChapter = async () => {
		try {
			setLoading(true);
			const req = await fetch("api/novel/chapter", {
				method: "POST",
				body: JSON.stringify({
					title: titleRef.current?.value,
					content: editorContent,
					novelId: novelId,
				}),
			});

			if (req.status !== 201) return toast("Gagal menulis content novel");

			const updateRole = await fetch(`api/user/${user!.id}`, {
				method: "PUT",
			});

			if (updateRole.ok)
				toast("Kamu telah selesai menulis novel pertamamu 👏");
			return router.replace(`./profile/${user?.username}`);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const fetchNovel = useCallback(async () => {
		const req = await fetch(`api/novel/${user!.author!.id}`);
		const res = await req.json();
		setNovelId(res.data.id);
	}, [user]);

	useEffect(() => {
		fetchNovel();
	}, [fetchNovel]);

	return (
		<main className="flex flex-col w-full space-y-8">
			<input
				placeholder="Masuk Judul Chapter"
				className="text-3xl bg-transpate hover:outline-none focus:outline-none"
				ref={titleRef}
			/>
			<div className="h-[300px] flex">
				<Editor setContent={(e) => setContent(e)} />
			</div>
			<div className="grid grid-cols-3 space-x-4">
				<Button variant="outline">Preview</Button>
				<Button
					variant="secondary"
					onClick={saveChapter}
					disabled={loading}
				>
					{loading && <Loader2 className="animate-spin" />}
					Save
				</Button>
				<Button>Publish</Button>
			</div>
		</main>
	);
};

export default WriteChapter;
