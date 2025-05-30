import BreadcrumbChapter from "@/components/novel/breadcrumb-chapter";
import ChapterComment from "@/components/novel/chapter-comment";
import prisma from "@/lib/prisma";
import parse from "html-react-parser";

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
			chapter: { where: { chapter: parseInt(id) }, take: 1 },
		},
	});

	if (!novel?.chapter) return null;

	return (
		<div className="space-y-4">
			<BreadcrumbChapter title={title} id={id} />
			<div className="space-y-4">
				<h1 className="text-5xl text-center">{novel.title}</h1>
				<div className="leading-loose text-lg">
					{parse(novel.chapter.at(0)?.content || "")}
				</div>
			</div>
			<ChapterComment />
		</div>
	);
};

export default page;
