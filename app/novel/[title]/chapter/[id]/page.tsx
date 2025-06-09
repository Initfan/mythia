import BreadcrumbChapter from "@/components/novel/breadcrumb-chapter";
import ChapterComment from "@/components/novel/chapter-comment";
import ChapterList from "@/components/novel/chapter-list";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import parser from "html-react-parser";
import { Eye, MessageCircle } from "lucide-react";
import Link from "next/link";

const page = async ({
	params,
}: {
	params: Promise<{ title: string; id: string }>;
}) => {
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

	if (!novel?.chapter) return null;

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<BreadcrumbChapter title={title} id={id} />
				<div className="space-x-3 flex">
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
			</div>
			<div className="space-y-4">
				<h1 className="text-5xl text-center">
					{novel.chapter.at(0)?.title}
				</h1>
				<div className="leading-loose text-lg">
					{parser(novel.chapter.at(0)!.content)}
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
		</div>
	);
};

export default page;
