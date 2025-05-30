"use client";
import React, { useContext, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Star } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { userContext } from "@/context/user-context";
import { novel_review } from "@/generated/prisma";

const CreateReview = ({
	novelId,
	addedReview,
}: {
	novelId: number;
	addedReview: (newReview: novel_review) => void;
}) => {
	const user = useContext(userContext);
	const reviewRef = useRef<HTMLTextAreaElement>(null);
	const [rated, setRated] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const req = await fetch("/api/novel/review", {
				method: "POST",
				body: JSON.stringify({
					rating: rated,
					review: reviewRef.current?.value || null,
					userId: user?.id,
					novelId: novelId,
				}),
			});

			const res = await req.json();
			addedReview(res.data);

			if (!req.ok) {
				toast.error(
					res.message || "Gagal mengirim review, silakan coba lagi."
				);
				return;
			}
			setLoading(false);
		} catch {
			setLoading(false);
			toast.error("Gagal mengirim review, silakan coba lagi.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Buat Review</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Review</DialogTitle>
				</DialogHeader>
				<Label>Rating</Label>
				<div className="space-x-2 flex">
					{Array.from([1, 2, 3, 4, 5]).map((v) => (
						<Star
							key={v}
							className="mr-2 cursor-pointer"
							onClick={() => setRated(v)}
							fill={rated >= v ? "yellow" : "none"}
							stroke={rated >= v ? "none" : "white"}
						/>
					))}
				</div>
				<Label>Tulis Review</Label>
				<Textarea ref={reviewRef} />
				<DialogFooter>
					<Button onClick={handleSubmit} disabled={loading}>
						{loading && <Loader2 className="animate-spin" />} Kirim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateReview;
