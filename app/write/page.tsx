/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useContext, useEffect, useState } from "react";
import StepWrite from "@/components/write/step-write";
import WriterProfile from "@/components/write/writer-profile";
import WriteNovel from "@/components/write/write-novel";
import WriteChapter from "@/components/write/write-chapter";
import { userContext } from "@/context/user-context";
import { redirect } from "next/navigation";

const page = () => {
	const user = useContext(userContext);
	const [novelId, setNovelId] = useState<number | null>(32);
	const [active, setActive] = useState<number>(
		user?.author && !novelId ? 2 : novelId ? 3 : 1
	);

	useEffect(() => {
		if (!user) return redirect("/");
	}, [user]);

	const setActivePage = (id: number) => setActive(id);
	const onSetNovelId = (id: number) => setNovelId(id);

	return (
		<>
			<StepWrite
				active={active}
				step={["Profile", "Buat Novel", "Tulis Cerita"]}
			/>
			<main className="space-x-8 flex lg:w-2/3 px-8 md:px-0 mx-auto">
				{active == 1 && <WriterProfile activePage={setActivePage} />}
				{active == 2 && (
					<WriteNovel
						activePage={setActivePage}
						onSetNovelId={onSetNovelId}
					/>
				)}
				{active == 3 && (
					<WriteChapter
						novelId={novelId}
						activePage={setActivePage}
					/>
				)}
			</main>
		</>
	);
};

export default page;
