/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { userLibrary } from "@/actions/library-action";
import { LoadingCardNovel } from "@/components/home/card-novel";
import NovelList from "@/components/library/novel-list";
import { Skeleton } from "@/components/ui/skeleton";
import { userContext } from "@/context/user-context";
import { Prisma } from "@/generated";
import { useContext, useEffect, useState, useTransition } from "react";

type libraryType = Prisma.user_libraryGetPayload<{
	include: {
		library_detail: true;
	};
}>;

const page = () => {
	const user = useContext(userContext);
	const [libraries, setLibraries] = useState<libraryType[]>();
	const [pending, transition] = useTransition();

	useEffect(() => {
		transition(async () => {
			const library = await userLibrary(user!.id);
			setLibraries(library);
		});
	}, [user]);

	return (
		<div className="space-y-4">
			<h1 className="text-3xl font-semibold">Perpustakaan Novel</h1>
			{libraries &&
				!pending &&
				libraries.map((v) => {
					const novelId: number[] = [];
					v.library_detail.map((v) => novelId.push(v.novelId));
					return (
						<div key={v.id} className="space-y-2">
							<h1 className="text-xl font-semibold">{v.title}</h1>
							{v.library_detail.length == 0 ? (
								<p
									key={v.id}
									className="text-sm text-yellow-500 flex items-center"
								>
									Belum ada list novel di pustaka ini.
								</p>
							) : (
								<NovelList novelsId={novelId} />
							)}
						</div>
					);
				})}
			{pending &&
				Array.from({ length: 5 }).map((_, i) => (
					<div key={i} className="space-y-2">
						<Skeleton className="h-6 w-1/4" />
						<LoadingCardNovel key={i} />
					</div>
				))}
		</div>
	);
};

export default page;
