"use client";
import { useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, SendIcon } from "lucide-react";
import { Prisma } from "@/generated";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { createComment } from "@/actions/novel-action";

type userComment = Prisma.ChapterCommentGetPayload<{
	include: { user: true };
}>;

const ChapterComment = ({
	comments,
	chapterId,
}: {
	comments: userComment[];
	chapterId: number;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [loading, transition] = useTransition();
	const [comment, setComment] = useState<userComment[]>(comments);

	const handleSubmit = () => {
		if (!inputRef.current?.value) return toast("Komen tidak boleh kosong");

		transition(async () => {
			const data = await createComment({
				chapterId,
				comment: inputRef.current!.value,
			});

			if (data.data) {
				toast(data.message);
				inputRef.current!.value = "";
				setComment((p) => [...p, data.data!]);
			} else {
				toast(data.message);
			}
		});
	};

	return (
		<div className="space-y-4">
			<h2 className="text-2xl font-semibold">
				Komentar ({comment.length})
			</h2>
			<div className="flex space-x-2">
				<Input
					className="flex-1"
					ref={inputRef}
					onKeyUp={(e) => e.code == "Enter" && handleSubmit()}
					disabled={loading}
				/>
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
