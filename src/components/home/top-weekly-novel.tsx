"use server";
import prisma from "@/lib/prisma";
import Cover from "../cover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dot } from "lucide-react";
import { Badge } from "../ui/badge";

const TopWeeklyNovel = async () => {
	const novel = await prisma.novel.findMany({
		take: 5,
		include: {
			chapter: true,
			author: { select: { pen_name: true, image: true } },
		},
	});

	return (
		<div className="my-6 space-y-4">
			<h1 className="text-3xl text-center font-semibold">
				Teratas Mingguan
			</h1>
			<div className="flex space-x-4">
				{novel.map((v, i) => (
					<Cover
						key={i}
						className={`md:w-1/3 md:basis-1/3 w-full h-[250px] relative cursor-pointer ${
							i === 2
								? "scale-105 mt-2"
								: i % 2
								? "mt-6"
								: "mt-10"
						}`}
						src={v.cover}
						alt={v.title}
					>
						<div className="absolute bottom-0 left-0 space-y-1 right-0 bg-gradient-to-t from-accent to-transparent h-16 flex items-center justify-center flex-col">
							<p className="font-bold">{v.title}</p>
							<p className="text-sm flex mb-2">
								<Badge className="text-white bg-primary font-semibold">
									{v.genre}
								</Badge>{" "}
								<Dot /> {v.status}
							</p>
						</div>
						<div className="absolute top-4 items-center left-4  flex space-x-2">
							<Avatar>
								<AvatarImage>{v.author.image}</AvatarImage>
								<AvatarFallback>
									{v.author.pen_name
										.slice(0, 1)
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<p>{v.author.pen_name}</p>
						</div>
					</Cover>
				))}
			</div>
		</div>
	);
};

export default TopWeeklyNovel;
