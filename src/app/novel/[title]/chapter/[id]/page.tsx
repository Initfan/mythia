import { historyRead } from "@/actions/novel-action";
import BreadcrumbChapter from "@/components/novel/breadcrumb-chapter";
import ChapterComment from "@/components/novel/chapter-comment";
import ChapterList from "@/components/novel/chapter-list";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import parser from "html-react-parser";
import { ChevronLeft, Eye, MessageCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

type Props = { params: Promise<{ title: string; id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { title, id } = await params;
	const novel = await prisma.novel.findFirst({
		where: { title: title.replaceAll("-", " ") },
		include: {
			author: true,
			_count: true,
			chapter: {
				where: { chapter: parseInt(id) },
				take: 1,
				include: { comment: { include: { user: true } } },
			},
		},
	});

	return {
		title: `${novel?.title} | ${
			novel?.chapter.at(parseInt(id) - 1)?.title
		}`,
		description: novel?.synopsis,
		keywords: novel?.genre,
	};
}

const page = async ({ params }: Props) => {
	const { title, id } = await params;

	const novel = await prisma.novel.findFirst({
		where: { title: title.replaceAll("-", " ") },
		include: {
			author: true,
			_count: true,
			chapter: {
				where: { chapter: parseInt(id) },
				take: 1,
				include: { comment: { include: { user: true } } },
			},
		},
	});

	try {
		await historyRead(novel?.chapter[Number(id) - 1].id ?? 0, novel!.id);

		await prisma.novel_chapter.update({
			where: {
				id: novel?.chapter.at(0)?.id,
			},
			data: {
				views: {
					increment: 1,
				},
			},
		});
	} catch (error) {
		console.log(error);
	}

	if (!novel?.chapter) return null;

	return (
		<main className="space-y-7 py-5">
			<Link href=".." className="block">
				<Button variant="outline" size="icon">
					<ChevronLeft />
				</Button>
			</Link>
			<section className="flex flex-col space-y-1 md:flex-row justify-between md:items-center">
				<BreadcrumbChapter title={title} id={id} />
				<div className="space-x-3 md:flex hidden">
					<p className="text-muted-foreground flex items-center space-x-1">
						<Eye size={18} />
						<span>{novel.chapter.at(0)?.views}</span>
					</p>
					<p className="text-muted-foreground flex items-center space-x-1">
						<MessageCircle size={18} />
						<span>{novel.chapter.at(0)?.comment.length}</span>
					</p>
					<p>
						Penulis{" "}
						<Link
							href={`/author/${novel.author.pen_name}`}
							className="font-semibold hover:underline hover:text-blue-500"
						>
							{novel.author.pen_name}
						</Link>
					</p>
				</div>
			</section>
			<div className="space-y-8">
				<h1 className="md:text-5xl text-3xl text-center">
					{novel.chapter.at(0)?.title}
				</h1>
				<article className="leading-loose md:text-lg">
					{parser(novel.chapter.at(0)!.content)}
				</article>
				<div className="space-x-3 md:hidden flex">
					<p className="text-muted-foreground flex items-center space-x-1">
						<Eye size={18} />
						<span>{novel.chapter.at(0)?.views}</span>
					</p>
					<p className="text-muted-foreground flex items-center space-x-1">
						<MessageCircle size={18} />
						<span>{novel.chapter.at(0)?.comment.length}</span>
					</p>
					<p>
						Penulis{" "}
						<Link
							href={`/author/${novel.author.pen_name}`}
							className="font-semibold hover:underline hover:text-blue-500"
						>
							{novel.author.pen_name}
						</Link>
					</p>
				</div>
				<div className="flex justify-center space-x-2">
					<ChapterList novelId={novel.id} />
					{novel._count.chapter != parseInt(id) && (
						<Button>
							<Link
								href={`/novel/${novel.title.replaceAll(
									" ",
									"-"
								)}/chapter/${parseInt(id) + 1}`}
							>
								Bab Selanjutnya
							</Link>
						</Button>
					)}
				</div>
			</div>
			<ChapterComment
				chapterId={novel.chapter.at(0)!.id}
				comments={novel.chapter.at(0)!.comment}
			/>
		</main>
	);
};

export default page;
