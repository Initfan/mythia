import WriteChapter from "@/components/write/write-chapter";

const page = async ({ params }: { params: Promise<{ novelId: string }> }) => {
	const { novelId } = await params;

	return <WriteChapter novelId={parseInt(novelId)} />;
};

export default page;
