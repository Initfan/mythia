import Rating from "@/components/novel/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ChevronLeft, Dot, User2 } from "lucide-react";
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
import { headers } from "next/headers";
import Cover from "@/components/cover";

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
		openGraph: {
			url:
				(await headers()).get("referer") ??
				"https://mythiavel.vercel.app",
			images: novel?.cover ?? "/images/mythia-mascot.png",
			siteName: "Mythia Novel",
			title:
				novel?.title ??
				"Mythia | Discover and Share Original Novels, Myths & Fantasy Worlds",
			description:
				novel?.synopsis ??
				"Explore Mythia, the ultimate platform for writers and readers of original novels, myths, and fantasy stories. Create your world, publish your tales, and connect with a passionate storytelling community.",
		},
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
		<main className="py-5 space-y-7">
			<Link href=".." className="block">
				<Button variant="outline" size="icon">
					<ChevronLeft />
				</Button>
			</Link>
			<section className="flex flex-col md:flex-row md:space-x-6 space-y-3">
				<div className="w-full md:w-[300px] relative h-[350px]">
					<Image
						src={novel.cover}
						alt={novel.title}
						className="rounded object-cover object-center"
						fill
					/>
				</div>
				<div className="flex justify-between flex-col lg:flex-row space-y-3">
					<div className="flex flex-col space-y-6 flex-1 items-start">
						<h1 className="text-4xl font-semibold">
							{novel.title}
						</h1>
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
						<div className="flex md:space-x-12 md:justify-baseline justify-between w-full md:w-auto">
							<Rating novelReview={novel.novel_review} />
							<div className="space-y-2 flex items-center flex-col">
								<h1 className="text-4xl">
									{novel.chapter.length}
								</h1>
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
						<ButtonLike
							likedBy={novel.liked_by}
							novelId={novel.id}
						/>
					</div>
				</div>
			</section>
			<article className="space-y-4">
				<h2 className="text-2xl font-semibold">Sinopsis</h2>
				<div className="text-muted-foreground leading-relaxed">
					{parser(novel.synopsis)}
				</div>
			</article>
			<ReviewSection
				review={novel.novel_review}
				novelId={novel.id}
				reviewedBy={novel.reviewd_by}
			/>
		</main>
	);
};

export default page;
