import prisma from "@/lib/prisma";
import Image from "next/image";
import React, { Fragment } from "react";

const PopularNovel = async () => {
	const novel = await prisma.novel.findMany();

	return (
		<>
			<h1 className="text-3xl font-semibold mb-4">Popular</h1>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
				{novel.map((v) => (
					<div key={v.id} className="flex h-[230px] space-x-4 ">
						<div className="h-full w-[40%] relative rounded overflow-hidden">
							<Image src={v.cover} alt={v.title} fill />
						</div>
						<div className="space-y-3 flex-1 flex justify-between flex-col">
							<h3 className="text-2xl font-semibold">
								{v.title}
							</h3>
							<p className="text-sm text-purple-600">{v.genre}</p>
							<p className="text-muted-foreground line-clamp-3">
								{v.synopsis}
							</p>
							<p className="text-sm text-muted">
								100k Views Ongoing
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default PopularNovel;
