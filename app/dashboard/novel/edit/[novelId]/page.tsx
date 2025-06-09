import EditNovel from "@/components/dashboard/edit-novel";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ novelId: string }> }) => {
	const { novelId } = await params;

	const novel = await prisma.novel.findUnique({
		where: { id: parseInt(novelId) },
		include: { tag: true },
	});

	if (!novel) return redirect("/dashboard/novel");

	return <EditNovel novel={novel} />;
};

export default page;
