/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import StepWrite from "@/components/write/step-write";
import WriterProfile from "@/components/write/writer-profile";
import WriteNovel from "@/components/write/write-novel";
import WriteChapter from "@/components/write/write-chapter";

const page = () => {
	const [active, setActive] = useState<number>(3);

	const setActivePage = (id: number) => setActive(id);

	return (
		<>
			<StepWrite
				active={active}
				step={["Profile", "Buat Novel", "Tulis Cerita"]}
			/>
			<main className="space-x-8 flex md:w-2/3 px-8 md:px-0 lg:w-1/2 mx-auto">
				{active == 1 && <WriterProfile activePage={setActivePage} />}
				{active == 2 && <WriteNovel activePage={setActivePage} />}
				{active == 3 && <WriteChapter />}
			</main>
		</>
	);
};

export default page;
