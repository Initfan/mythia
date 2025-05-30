"use client";
import React, { useContext, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendIcon } from "lucide-react";
import { Prisma } from "@/generated/prisma";
import { toast } from "sonner";
import { userContext } from "@/context/user-context";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

type userComment = Prisma.chapter_commentGetPayload<{
	include: { user: true };
}>;

const ChapterComment = ({
	comments,
	chapterId,
}: {
	comments: userComment[];
	chapterId: number;
}) => {
	const user = useContext(userContext);
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = React.useState(false);
	const [comment, setComment] = React.useState<userComment[]>(comments);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const req = await fetch("/api/novel/chapter/comment", {
				method: "POST",
				body: JSON.stringify({
					comment: inputRef.current?.value,
					userId: user?.id,
					chapterId,
				}),
			});

			if (!req.ok) {
				const res = await req.json();
				toast.error(res.message || "Gagal mengirim komentar");
				return;
			}

			const res = await req.json();
			setComment((p) => [...p, res.data]);
			inputRef.current!.value = "";
			setLoading(false);
			toast.success("Komentar berhasil dikirim");
		} catch {
			setLoading(false);
			toast.error("Gagal mengirim komentar");
		}
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-semibold">Komentar</h2>
			<div className="flex space-x-2">
				<Input className="flex-1" ref={inputRef} />
				<Button onClick={handleSubmit} disabled={loading}>
					{loading ? (
						<Loader2 className="animate-spin" />
					) : (
						<SendIcon />
					)}
				</Button>
			</div>
			{comment.length == 0 && (
				<p className="text-muted-foreground">
					Belum ada komentar pada bab ini. Jadilah yang pertama untuk
					berkomentar!
				</p>
			)}
			<div className="space-y-6">
				{comment.map((value) => (
					<div key={value.id}>
						<div
							className="flex space-x-2 items-start"
							key={value.id}
						>
							<Avatar>
								<AvatarFallback>
									{value.user.username
										.slice(0, 1)
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="space-y-2">
								<h3 className="text-lg">
									{value.user.username}
								</h3>
								<p>{value.comment}</p>
							</div>
						</div>
						<Separator className="my-2" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ChapterComment;
