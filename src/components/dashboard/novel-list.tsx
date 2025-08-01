"use client";

import { getAuthorNovel } from "@/actions/novel-action";
import { Prisma } from "@/generated";
import { useEffect, useState, useTransition } from "react";
import CardNovel, { LoadingCardNovel } from "../home/card-novel";
import { Button } from "../ui/button";
import { PenBox } from "lucide-react";
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
		<div className="space-y-4 pb-8">
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
						<div className="flex space-x-2 absolute bottom-2 left-2 md:left-auto md:bottom-0 md:right-0">
							<Link href={`novel/edit/${v.id}`}>
								<Button variant="secondary" size="sm">
									<PenBox />
								</Button>
							</Link>
							<Link href={`novel/write/${v.id}`}>
								<Button size="sm">Tulis Bab</Button>
							</Link>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default DashboardNovelList;
