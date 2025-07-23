import Rating from "@/components/novel/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Dot, User2 } from "lucide-react";
import Link from "next/link";
import parser from "html-react-parser";
import { notFound } from "next/navigation";
import ReviewSection from "@/components/novel/review";
import Share from "@/components/novel/share";
import ButtonLibrary from "@/components/novel/button-library";
import Image from "next/image";
import ChapterList from "@/components/novel/chapter-list";
import ButtonLike from "@/components/novel/button-like";
import { Metadata } from "next";

type Props = { params: Promise<{ title: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { title } = await params;
	const novel = await prisma.novel.findFirst({
		where: { title: title.replaceAll("-", " ") },
	});

	return {
		title: `Mythia | ${novel?.title}`,
		description: novel?.synopsis,
		keywords: novel?.genre,
	};
}

const page = async ({ params }: Props) => {
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
					views: true,
					createdAt: true,
				},
				take: 1,
			},
			novel_review: { include: { user: true } },
		},
	});

	if (!novel) return notFound();

	return (
		<>
			<div className="flex space-x-6">
				<div className="w-[250px] relative h-[300px]">
					<Image
						src={novel.cover}
						alt={novel.title}
						className="rounded object-cover object-center"
						fill
					/>
				</div>
				<div className="flex flex-col space-y-6 flex-1 items-start">
					<h1 className="text-4xl font-semibold">{novel.title}</h1>
					<div className="flex space-x-2">
						<Badge>{novel.genre}</Badge>
						<Dot />
						<p>{novel.status}</p>
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
						<Rating novelReview={novel.novel_review} />
						<div className="space-y-2 flex items-center flex-col">
							<h1 className="text-4xl">{novel.chapter.length}</h1>
							<p className="text-muted-foreground">Bab</p>
						</div>
						<div className="space-y-2 flex items-center flex-col">
							<h1 className="text-4xl">{novel.views}</h1>
							<p className="text-muted-foreground">Dibaca</p>
						</div>
					</div>
					<div className="space-x-2 flex">
						<Link
							href={`/novel/${novel.title.replaceAll(
								" ",
								"-"
							)}/chapter/1`}
						>
							<Button>Mulai Membaca</Button>
						</Link>
						<ChapterList novelId={novel.id} />
						<Share />
					</div>
				</div>
				<div className="space-x-2">
					<ButtonLibrary novelId={novel.id} />
					<ButtonLike likedBy={novel.liked_by} novelId={novel.id} />
				</div>
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold">Sinopsis</h2>
				<div className="text-muted-foreground leading-relaxed">
					{parser(novel.synopsis)}
				</div>
			</div>
			<ReviewSection
				review={novel.novel_review}
				novelId={novel.id}
				reviewedBy={novel.reviewd_by}
			/>
		</>
	);
};

export default page;
