import Cover from "@/components/cover";
import { verifySession } from "@/lib/dal";
import prisma from "@/lib/prisma";

const page = async () => {
	const { user } = await verifySession();
	const novel = await prisma.novel.findMany({
		where: {
			authorId: user?.author?.id,
		},
	});

	return (
		<>
			<h1 className="text-3xl">Novel Ku</h1>
			{novel.map((n) => (
				<div className="flex space-x-4" key={n.id}>
					<Cover src={n.cover} alt={n.title} />
					<h1 className="text-2xl">{n.title}</h1>
				</div>
			))}
		</>
	);
};

export default page;
