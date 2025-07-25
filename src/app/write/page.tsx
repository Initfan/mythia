/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useContext, useEffect, useState } from "react";
import StepWrite from "@/components/write/step-write";
import WriterProfile from "@/components/write/writer-profile";
import WriteNovel from "@/components/write/write-novel";
import WriteChapter from "@/components/write/write-chapter";
import { userContext } from "@/context/user-context";
import { redirect } from "next/navigation";
import Navigation from "@/components/ui/navigation";

const page = () => {
	const user = useContext(userContext);
	const [novelId, setNovelId] = useState<number | null>(null);
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
			<Navigation />
			<section className="lg:w-2/3 mx-auto md:space-y-12 space-y-6 py-5">
				<StepWrite
					active={active}
					step={["Profile", "Buat Novel", "Tulis Cerita"]}
				/>
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
			</section>
		</>
	);
};

export default page;
