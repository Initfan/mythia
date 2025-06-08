"use client";

import { getAuthorNovel } from "@/actions/novel-action";
import { userContext } from "@/context/user-context";
import { Prisma } from "@/generated";
import { useContext, useEffect, useState, useTransition } from "react";
import CardNovel, { LoadingCardNovel } from "../home/card-novel";

type novel = Prisma.novelGetPayload<{ include: { chapter: true } }>;

const DashboardNovelList = () => {
	const user = useContext(userContext);
	const [pending, transition] = useTransition();
	const [novel, setNovel] = useState<novel[]>();

	useEffect(() => {
		transition(async () => {
			const data = await getAuthorNovel(user!.author!.id);
			setNovel(data);
		});
	}, [user]);

	return (
		<div className="space-y-4">
			{pending &&
				Array.from({ length: 5 }).map((v, i) => (
					<LoadingCardNovel key={i} />
				))}
			{!pending && novel?.length == 0 ? (
				<p>Kamu belum menulis novel.</p>
			) : (
				novel?.map((v) => <CardNovel key={v.id} v={v} />)
			)}
		</div>
	);
};

export default DashboardNovelList;
