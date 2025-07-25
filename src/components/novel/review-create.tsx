"use client";
import React, { useRef, useState, useTransition } from "react";
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
import { Prisma } from "@/generated";
import { createReview } from "@/actions/review-action";
import { toast } from "sonner";

type userReview = Prisma.novel_reviewGetPayload<{
	include: { user: true };
}>;

const CreateReview = ({
	novelId,
	addedReview,
}: {
	novelId: number;
	addedReview: (newReview: userReview, reviewers: number[]) => void;
}) => {
	const reviewRef = useRef<HTMLTextAreaElement>(null);
	const dialogRef = useRef<HTMLButtonElement>(null);
	const [rated, setRated] = useState(0);
	const [pending, transition] = useTransition();

	const handleSubmit = () => {
		transition(async () => {
			const review = await createReview({
				novelId,
				rating: rated + 1,
				review: reviewRef.current!.value,
			});
			if (review.status == 201) {
				toast("Berhasil membuat review");
				addedReview(review.data!, review.reviewers!.reviewd_by);
				dialogRef.current?.click();
			}
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild ref={dialogRef}>
				<Button variant="outline">Buat Ulasan</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Ulasan</DialogTitle>
				</DialogHeader>
				<Textarea ref={reviewRef} placeholder="Ketik ulasan..." />
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
				<DialogFooter>
					<Button onClick={handleSubmit} disabled={pending}>
						{pending && <Loader2 className="animate-spin" />} Kirim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateReview;
