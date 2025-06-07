// prisma/seed.ts

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const seed_user = 20;
	const seed_novel = 40;
	console.log("🌱 Seeding data...");

	const users = [];
	const authors = [];
	for (let i = 0; i < seed_user; i++) {
		const user = await prisma.user.create({
			data: {
				username: faker.person.fullName(),
				password: faker.internet.password(),
				email: faker.internet.email(),
			},
		});

		const author = await prisma.author.create({
			data: {
				pen_name: faker.person.fullName(),
				phone: faker.phone.number(),
				image: faker.image.avatar(),
				gender: faker.helpers.arrayElement(["pria", "perempuan"]),
				email: faker.internet.email(),
				userId: user.id,
			},
		});
		users.push(user);
		authors.push(author);
	}

	for (let i = 0; i < seed_novel; i++) {
		const author = faker.helpers.arrayElement(authors);

		const novel = await prisma.novel.create({
			data: {
				title: faker.lorem.words(3),
				genre: faker.music.genre(),
				synopsis: faker.lorem.sentences(2),
				content_rating: faker.helpers.arrayElement([
					"G",
					"PG",
					"PG-13",
					"R",
				]),
				authorId: author.id,
				cover: faker.image.urlPicsumPhotos(),
				target_audience: faker.helpers.arrayElement([
					"dewasa",
					"remaja",
					"anak-anak",
				]),
				views: faker.number.int({ min: 0, max: 1000 }),
				status: faker.helpers.arrayElement(["", ""]),
				reviewd_by: users.map((u) => u.id),
			},
		});

		// Create chapters for each novel
		for (let ch = 1; ch <= 2; ch++) {
			await prisma.novel_chapter.create({
				data: {
					chapter: ch,
					title: `Chapter ${ch}: ${faker.lorem.words(2)}`,
					content: faker.lorem.paragraphs(3),
					novelId: novel.id,
				},
			});
		}

		// Create reviews for each novel
		for (let j = 0; j < 2; j++) {
			const user = users[j];

			await prisma.novel_review.create({
				data: {
					rating: faker.number.int({ min: 1, max: 5 }),
					review: faker.lorem.sentences(2),
					novelId: novel.id,
					userId: user.id,
					likes: faker.number.int({ min: 0, max: 100 }),
					liked_by: users
						.filter((u) => u.id !== user.id)
						.map((u) => u.id),
				},
			});
		}
	}

	console.log("✅ Seeding complete!");
}

main()
	.catch((e) => {
		console.error("❌ Seeding failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
