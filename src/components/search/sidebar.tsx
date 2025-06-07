"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { genre } from "@prisma/client";
import { getAllGenre } from "@/actions/novel-action";

const sidebarContent = [
	{ title: "Tipe", children: ["gratis", "berbayar", "percobaan"] },
	{ title: "Popularitas", children: ["rating", "dilihat", "disukai"] },
	{ title: "Terbit", children: ["terbaru", "terlama"] },
	{ title: "Status", children: ["berjalan", "selesai", "hiatus"] },
];

const SidebarSearch = () => {
	const [genre, setGenre] = useState<genre[]>();
	const [pending, setPending] = useState(false);

	useEffect(() => {
		setPending(true);
		getAllGenre().then((res) => setGenre(res));
		setPending(false);
	}, []);

	return (
		<div className="space-y-3">
			{sidebarContent.map((v) => (
				<>
					<h2 className="text-2xl font-semibold">{v.title}</h2>
					<div>
						{v.children.map((v, i) => (
							<div
								key={i}
								className="p-2 rounded cursor-pointer flex items-center hover:bg-primary/50 space-x-2"
							>
								<Checkbox /> <p>{v}</p>
							</div>
						))}
					</div>
				</>
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
						<Button key={i} size="sm" variant="outline">
							{v.genre}
						</Button>
					))}
			</div>
		</div>
	);
};

export default SidebarSearch;
