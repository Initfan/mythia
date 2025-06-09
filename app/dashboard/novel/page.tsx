import DashboardNovelList from "@/components/dashboard/novel-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<>
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-semibold">Novelku</h1>
					<Button variant="outline">
						<Link href="/write">Tulis novel</Link>
					</Button>
				</div>
				<DashboardNovelList />
			</div>
		</>
	);
};

export default page;
