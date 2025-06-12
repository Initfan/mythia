/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { userLibrary } from "@/actions/library-action";
import { LoadingCardNovel } from "@/components/home/card-novel";
import NovelList from "@/components/library/novel-list";
import CreateLibrary from "@/components/novel/create-library";
import { Skeleton } from "@/components/ui/skeleton";
import { Prisma } from "@/generated";
import { useEffect, useState, useTransition } from "react";

type libraryType = Prisma.user_libraryGetPayload<{
	include: {
		library_detail: true;
	};
}>;

const page = () => {
	const [libraries, setLibraries] = useState<libraryType[]>();
	const [pending, transition] = useTransition();

	useEffect(() => {
		transition(async () => {
			const library = await userLibrary();
			setLibraries(library);
		});
	}, []);

	const onAddLibrary = (library: libraryType) =>
		transition(() => setLibraries((p) => [...p!, library]));

	return (
		<div className="space-y-4">
			<div className="flex justify-between">
				<h1 className="text-3xl font-semibold flex-1">
					Perpustakaan Novel
				</h1>
				{!pending && <CreateLibrary onAddLibrary={onAddLibrary} />}
			</div>
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
				Array.from({ length: 2 }).map((_, i) => (
					<div key={i} className="space-y-2">
						<Skeleton className="h-6 w-1/4" />
						<LoadingCardNovel key={i} />
					</div>
				))}
		</div>
	);
};

export default page;
