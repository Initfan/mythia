import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
	const genres = [
		"urban",
		"fantasy",
		"history",
		"sci-fi",
		"teen",
		"horor",
		"sports",
		"games",
		"eastenrn",
		"realistic",
		"action",
		"war",
	];

	await prisma.genre.createMany({
		data: genres.map((v) => ({ genre: v, genreType: "male" })),
	});

	const genre = await prisma.genre.findMany();
	console.log(genre);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();
		process.exit();
	});
