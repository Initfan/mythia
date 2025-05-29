import prisma from "@/lib/prisma";
import React from "react";
import Cover from "../cover";
import { Dot } from "lucide-react";
import Link from "next/link";

const PopularNovel = async () => {
	const novel = await prisma.novel.findMany({ include: { chapter: true } });

	return (
		<>
			<h1 className="text-3xl font-semibold mb-4">Popular</h1>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
				{novel.map((v) => (
					<Link
						key={v.id}
						href={`/novel/${v.title.replaceAll(" ", "-")}`}
						className="flex h-[230px] space-x-4 hover:cursor-pointer group"
					>
						<Cover src={v.cover} alt={v.title} />
						<div className="space-y-3 flex-1 flex justify-between flex-col">
							<h3 className="text-2xl font-semibold group-hover:underline">
								{v.title}
							</h3>
							<p className="text-sm text-purple-600 flex space-x-4">
								{v.genre}{" "}
								<span className="text-primary flex space-x-4">
									<Dot /> On going
								</span>
							</p>
							<p className="text-muted-foreground line-clamp-3">
								{v.synopsis}
							</p>
							<p className="text-sm text-muted flex">
								100k views
								<Dot />
								{v.chapter.length} Chapters
							</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default PopularNovel;
