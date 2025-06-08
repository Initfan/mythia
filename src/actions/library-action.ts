"use server";
import { Prisma } from "@/generated";
import prisma from "@/lib/prisma";

type libraryType = Prisma.user_libraryGetPayload<{
	include: { library_detail: true };
}>;

export const createLibrary = async (
	title: string,
	userId: number
): Promise<libraryType> => {
	const library = await prisma.user_library.create({
		data: { title, userId },
		include: { library_detail: true },
	});

	return library;
};

export const userLibrary = async (userId: number): Promise<libraryType[]> => {
	const libraries = await prisma.user_library.findMany({
		where: { userId },
		include: { library_detail: true },
	});

	return libraries;
};

export const addLibraryNovel = async (libraryId: number, novelId: number) => {
	try {
		const library = await prisma.user_library.update({
			where: { id: libraryId },
			data: { library_detail: { create: { novelId } } },
			include: { library_detail: true },
		});

		const libraries = await prisma.user_library.findUnique({
			where: { id: libraryId },
			include: { library_detail: true },
		});

		return {
			message: "Berhasil menambah ke pustaka " + library.title,
			library: libraries,
		};
	} catch (error) {
		return { message: "Gagal menambah ke pustaka", error };
	}
};
