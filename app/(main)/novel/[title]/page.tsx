import Rating from "@/components/novel/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Dot, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import parse from "html-react-parser";
import { Separator } from "@/components/ui/separator";
import ReviewSection from "@/components/novel/review";
import Cover from "@/components/cover";
import Share from "@/components/novel/share";
import ButtonLibrary from "@/components/novel/button-library";
// import ButtonLibrary from "@/components/novel/button-library";

const page = async ({ params }: { params: Promise<{ title: string }> }) => {
	const { title } = await params;

	const novel = await prisma.novel.findFirst({
		where: { title: title.replaceAll("-", " ") },
		include: {
			author: true,
			chapter: {
				select: {
					id: true,
					title: true,
					comment: true,
					content: true,
					chapter: true,
					createdAt: true,
				},
				take: 1,
			},
			novel_review: { include: { user: true } },
		},
	});

	if (!novel) return redirect("/");

	return (
		<div className="mx-auto w-3/4 space-y-6 pb-10">
			<div className="flex space-x-6">
				<div className="w-[250px] relative h-[300px]">
					<Cover src={novel.cover} alt={novel.title} />
				</div>
				<div className="flex flex-col space-y-6 flex-1 items-start">
					<h1 className="text-4xl font-semibold">{novel.title}</h1>
					<div className="flex space-x-2 text-muted-foreground">
						<Badge className="text-purple-500">{novel.genre}</Badge>
						<Dot />
						<p>On going</p>
					</div>
					<div className="flex space-x-2 items-center group">
						<Avatar>
							<AvatarImage
								src={novel.author.image!}
								alt={novel.author.pen_name}
							/>
							<AvatarFallback>
								<User2 />
							</AvatarFallback>
						</Avatar>
						<Link
							href={`/author/${novel.author.pen_name}`}
							className="group-hover:underline"
						>
							{novel.author.pen_name}
						</Link>
					</div>
					<div className="flex space-x-12">
						<Rating
							rating={novel.novel_review.length}
							reviews={novel.novel_review.length}
						/>
						<div className="space-y-2 flex items-center flex-col">
							<h1 className="text-4xl">{novel.chapter.length}</h1>
							<p className="text-muted-foreground">Bab</p>
						</div>
						<div className="space-y-2 flex items-center flex-col">
							<h1 className="text-4xl">{novel.views}</h1>
							<p className="text-muted-foreground">Dibaca</p>
						</div>
					</div>
					<div className="space-x-4 flex">
						<Button>Mulai Membaca</Button>
						<Share />
					</div>
				</div>
				<ButtonLibrary novelId={novel.id} />
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Sinopsis</h2>
				<p className="text-muted-foreground leading-relaxed">
					{novel.synopsis}
				</p>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Pratinjau Bab 1</h2>
				<div className="flex space-x-6 items-center">
					<Separator className="flex-1" />
					<h1 className="text-3xl font-bold text-center">
						{novel.chapter.at(0)?.title}
					</h1>
					<Separator className="flex-1" />
				</div>
				<div className="leading-loose text-lg">
					{parse(novel.chapter.at(0)!.content)}
				</div>
				<div className="flex justify-center space-x-2">
					<Button variant="outline">Daftar Bab</Button>
					<Button>Bab Selanjutnya</Button>
				</div>
			</div>
			<ReviewSection
				review={novel.novel_review}
				novelId={novel.id}
				reviewedBy={novel.reviewd_by}
			/>
		</div>
	);
};

export default page;
