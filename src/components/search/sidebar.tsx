"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { getAllGenre } from "@/actions/novel-action";
import { useRouter, useSearchParams } from "next/navigation";
import { genre } from "@/generated";

type sidebarType = {
	title: "type" | "popular" | "created" | "status";
	label: string;
	children: string[];
};

const sidebarContent: sidebarType[] = [
	{
		title: "type",
		label: "Tipe",
		children: ["gratis", "berbayar", "percobaan"],
	},
	{ title: "created", label: "Terbit", children: ["terbaru", "terlama"] },
	{
		title: "status",
		label: "Status",
		children: ["berjalan", "selesai", "hiatus"],
	},
];

const SidebarSearch = () => {
	const router = useRouter();
	const params = useSearchParams();
	const [genre, setGenre] = useState<genre[]>();
	const [pending, setPending] = useState(false);
	const [activeFilter, setActiveFilter] = useState<{
		title: string | null;
		active: string | null;
	}>({
		title: null,
		active: null,
	});

	useEffect(() => {
		setActiveFilter({
			title: params.get("filter"),
			active: params.get("value"),
		});
	}, [params]);

	const filteringNovel = (title: string, value: string) => {
		setPending(true);
		const novelTitle = params.get("title")
			? `&title=${params.get("title")}`
			: null;
		router.replace(`/search?${novelTitle}filter=${title}&value=${value}`);
		setPending(false);
	};

	useEffect(() => {
		setPending(true);
		getAllGenre().then((res) => setGenre(res));
		setPending(false);
	}, []);

	return (
		<div className="space-y-3">
			{sidebarContent.map((sidebar) => (
				<div key={sidebar.title}>
					<h2 className="text-2xl font-semibold mb-2">
						{sidebar.label}
					</h2>
					<div>
						{sidebar.children.map((v, i) => (
							<div
								key={i}
								className={`p-2 rounded cursor-pointer flex items-center hover:bg-primary/50 space-x-2 ${
									pending ? "text-muted" : ""
								}`}
								onClick={() => filteringNovel(sidebar.title, v)}
							>
								<Checkbox checked={activeFilter.active == v} />{" "}
								<p>{v}</p>
							</div>
						))}
					</div>
				</div>
			))}
			<h2 className="text-2xl font-semibold">Genre</h2>
			<div className="flex flex-wrap gap-2">
				{pending &&
					Array.from({ length: 10 }).map((_, i) => (
						<Skeleton key={i} className="flex-1/4">
							<Button className="w-full"></Button>
						</Skeleton>
					))}
				{genre &&
					genre.map((v, i) => (
						<Button
							key={i}
							size="sm"
							variant={
								activeFilter.active == v.genre
									? "default"
									: "outline"
							}
							onClick={() => filteringNovel("genre", v.genre)}
						>
							{v.genre}
						</Button>
					))}
			</div>
		</div>
	);
};

export default SidebarSearch;
