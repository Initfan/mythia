"use client";

import { getAuthorNovel } from "@/actions/novel-action";
import { Prisma } from "@/generated";
import { useEffect, useState, useTransition } from "react";
import CardNovel, { LoadingCardNovel } from "../home/card-novel";
import { Button } from "../ui/button";
import { Eye, PenBox } from "lucide-react";
import Link from "next/link";

type novel = Prisma.novelGetPayload<{ include: { chapter: true } }>;

const DashboardNovelList = () => {
	const [pending, transition] = useTransition();
	const [novel, setNovel] = useState<novel[]>();

	useEffect(() => {
		transition(async () => {
			const data = await getAuthorNovel();
			setNovel(data);
		});
	}, []);

	return (
		<div className="space-y-4">
			{pending &&
				Array.from({ length: 2 }).map((v, i) => (
					<LoadingCardNovel key={i} />
				))}
			{!pending && novel?.length == 0 ? (
				<p>Kamu belum menulis novel.</p>
			) : (
				novel?.map((v) => (
					<div key={v.id} className="relative">
						<CardNovel key={v.id} v={v} />
						<div className="flex space-x-2 absolute bottom-0 right-0">
							<Button variant="outline" size="sm">
								<Eye />
							</Button>
							<Button variant="outline" size="sm">
								<PenBox />
							</Button>
							<Button size="sm">
								<Link href="novel/write">Tulis Bab</Link>
							</Button>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default DashboardNovelList;
