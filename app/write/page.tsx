/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import StepWrite from "@/components/write/step-write";
import WriterProfile from "@/components/write/writer-profile";

const page = () => {
	const [active, setActive] = useState<number>(1);

	const setActivePage = (id: number) => setActive(id);
	console.log(active);

	return (
		<>
			<StepWrite
				active={1}
				step={["Profile", "Buat Novel", "Tulis Cerita"]}
			/>
			<main className="space-x-8 flex w-1/2 mx-auto">
				{active == 1 && <WriterProfile activePage={setActivePage} />}
			</main>
		</>
	);
};

export default page;
